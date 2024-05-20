import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddRoomResult } from '@root/backend/room/interfaces/room.interface';
import { CreateRoomUserDto } from '@root/backend/roomUser/dto/createRoomUser.dto';
import { ApprovalStatus } from '@root/backend/roomUser/enums/roomUsers.enum';
import { RoomUserService } from '@root/backend/roomUser/roomUser.service';
import { UserService } from '@root/backend/user/user.service';
import { Repository } from 'typeorm';

import { CreateRoomDto } from './dto/createRoom.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
    public constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        private readonly userService: UserService,
        private readonly roomUserService: RoomUserService,
    ) {}

    public async addRoom(createRoomDto: CreateRoomDto, userId: number): Promise<AddRoomResult> {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            return {
                success: false,
                message: 'User not found',
            };
        }

        const room = this.roomRepository.create({
            ...createRoomDto,
            createdBy: user,
        });

        try {
            const savedRoom = await this.roomRepository.save(room);
            const createRoomUserDto: CreateRoomUserDto = {
                userId,
                approvalStatus: ApprovalStatus.APPROVED,
                roomId: savedRoom.roomId,
                createdAt: new Date(),
                updatedAt: new Date(),
                updatedBy: null,
                leftAt: null,
                hash: null,
            };

            await this.roomUserService.addRoomUser(createRoomUserDto);

            return {
                success: true,
                message: 'Room created successfully',
                data: savedRoom,
            };
        } catch (error) {
            console.error('Failed to create room:', error.message);

            return {
                success: false,
                message: `Failed to create room: ${error.message}`,
            };
        }
    }

    public async getRooms(): Promise<Array<Room>> {
        return await this.roomRepository.find();
    }

    // public async sendRoomJoinInvitation(): Promise<Array<Room>> {
    //     return await this.roomRepository.find();
    // }

    // TODO
    // getRoom(id: number) {
    //     return `This action returns a #${id} room`;
    // }
    //
    // updateRoom(id: number, updateRoomDto: UpdateRoomDto) {
    //     return `This action updates a #${id} room`;
    // }
    //
    // deleteRoom(id: number) {
    //     return `This action removes a #${id} room`;
    // }
}
