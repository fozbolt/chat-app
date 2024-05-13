import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import crypto from 'crypto';
import { Repository } from 'typeorm';

import { CreateMessageDto } from '../message/dto/createMessage.dto';
import { MessageService } from '../message/message.service';
import { Room } from '../room/entities/room.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateRoomUserDto } from './dto/createRoomUser.dto';
import { UpdateRoomUserDto } from './dto/updateRoomUser.dto';
import { RoomUser } from './entities/roomUser.entity';
import { ApprovalStatus } from './enums/roomUsers.enum';

@Injectable()
export class RoomUserService {
    public constructor(
        @InjectRepository(RoomUser)
        private readonly roomUserRepository: Repository<RoomUser>,
        // private readonly messageService: MessageService, // circ dep issue
        private readonly userService: UserService,
        private readonly moduleRef: ModuleRef,
    ) {}

    /**
     * add function return type
     * @param createRoomUserDto
     */
    public async addRoomUser(createRoomUserDto: CreateRoomUserDto): Promise<
        | string
        | {
              roomUserHash: string;
              roomUsers: Array<RoomUser>;
          }
    > {
        let newRoomUser: RoomUser;
        let joinResponse:
            | string
            | {
                  roomUserHash: string;
                  roomUsers: Array<RoomUser>;
              }; //add interface or improve logic

        // TODO
        //ovo ne radi jer je u db user_id i room_id null
        const requestAlreadySent = await this.getRoomUserByUserId(createRoomUserDto.userId, createRoomUserDto.roomId);

        if (!requestAlreadySent) {
            //probably not needed since possibility is low
            let isHashUnique = false;

            do {
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                const randomString = Math.random().toString(36).substring(2);
                const hash = crypto.createHash('sha256').update(randomString).digest('hex');
                const roomUser = await this.getRoomUserByHash(hash, createRoomUserDto.roomId);

                if (!roomUser) {
                    createRoomUserDto.hash = hash;

                    try {
                        const { userId, roomId, ...rest } = createRoomUserDto;

                        newRoomUser = this.roomUserRepository.create({
                            user: { userId: userId },
                            room: { roomId: roomId },
                            ...rest,
                        });

                        const newRoomUserFromDb = await this.roomUserRepository.save(newRoomUser);
                        const approvedRoomUsers = await this.getApprovedRoomUsers(roomId);

                        joinResponse = {
                            roomUserHash: newRoomUserFromDb?.hash,
                            roomUsers: approvedRoomUsers,
                        };

                        isHashUnique = true;
                    } catch (e) {
                        return e.message;
                    }
                }
            } while (!isHashUnique);
        } else {
            // add better logs, separate each case
            // currently for statuses approved, pending and forbidden
            joinResponse = `Your room join request is already in status: ${requestAlreadySent.approvalStatus.toUpperCase()}`;
        }

        return joinResponse;
    }

    /**
     * gets approved room users only
     * @param roomId
     */
    public async getApprovedRoomUsers(roomId: Room['roomId']): Promise<Array<RoomUser>> {
        const approvedUsers = await this.roomUserRepository.find({
            where: { approvalStatus: ApprovalStatus.APPROVED, room: { roomId } },
        });
        //TODO: also return userId here to successfully identify user and use it in B5 or in general
        return approvedUsers;
    }

    public async getRoomUserByUserId(roomId: Room['roomId'], userId: User['userId']): Promise<RoomUser | null> {
        return await this.roomUserRepository.findOne({
            where: {
                user: { userId },
                room: { roomId },
            },
        });
    }

    public async getRoomUserByHash(hash: RoomUser['hash'], roomId: Room['roomId']): Promise<RoomUser | null> {
        return await this.roomUserRepository.findOneBy({
            hash: hash,
            room: { roomId },
        });
    }

    /**
     * Probao nesto genericnog ali neide
     * @param userParamObj
     */
    public async findRoomUser(userParamObj: Partial<RoomUser>): Promise<RoomUser | null> {
        return await this.roomUserRepository.findOne({ where: userParamObj });
    }

    //TODO: all this should be a transaction or join message in queue or sth
    public async updateRoomUser(
        roomId: number,
        userId: number,
        updateRoomUserDto: UpdateRoomUserDto,
    ): Promise<RoomUser> {
        try {
            const roomUser = await this.getRoomUserByUserId(roomId, userId);

            if (!roomUser) {
                throw new Error('Room user not found');
            }
            if (roomUser.approvalStatus === updateRoomUserDto.approvalStatus) {
                throw new Error('Selected approval status cannot be the same as the current one');
            }
            if (!updateRoomUserDto.approvalStatus || !updateRoomUserDto.updatedBy) {
                throw new Error('Missing required fields while updating room user');
            }

            roomUser.approvalStatus = updateRoomUserDto.approvalStatus;
            roomUser.updatedBy = updateRoomUserDto.updatedBy;

            //TODO  ovo poboljsati kasnije
            //TODO replace throws with console logs?
            const updatedRoomUser = await this.roomUserRepository.save(roomUser);
            const createMessageDto: CreateMessageDto = {
                createdAt: new Date(),
                roomId,
                userId,
                isDeleted: 0,
                messageText: '',
            };

            const approvedUser = await this.userService.getUser(userId);
            // const approvedUser: User = await this.userService.getUser(userId); // ili ovako? sto forceati

            try {
                if (approvedUser) {
                    const messageService = this.moduleRef.get(MessageService, {
                        strict: false,
                    });

                    if (updatedRoomUser.approvalStatus === ApprovalStatus.APPROVED) {
                        createMessageDto.messageText = `User ${approvedUser.username} has joined the room`;
                        await messageService.addRoomMessage(createMessageDto, roomId);
                        //
                    } else if (updatedRoomUser.approvalStatus === ApprovalStatus.LEFT) {
                        roomUser.leftAt = new Date(Date.now());
                        createMessageDto.messageText = `User ${approvedUser.username} has left the room`;
                        await messageService.addRoomMessage(createMessageDto, roomId);
                    }
                } else {
                    throw new Error('Failed to fetch user data after user join approval');
                }
            } catch (e) {
                throw new Error(
                    JSON.stringify({
                        fullMessage: e.message,
                        message: 'Fail while creating message for user approval status change',
                    }),
                );
            }
            //TODO updateCountry return statement
            return await this.roomUserRepository.save(roomUser);
        } catch (error) {
            console.error('Error while updating room user:', error);
            throw new Error('Failed to updateCountry room user'); //update country??
        }
    }

    async deleteRoomUser(id: number): Promise<string> {
        return await `This action removes a #${id} roomUser`;
    }
}
