import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { UpdateMessageDto } from './dto/updateMessage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MoreThan, Repository } from 'typeorm';
import { RoomUserService } from '../roomUser/roomUser.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class MessageService {
    private roomUserService: RoomUserService;

    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        // private readonly roomUserService: RoomUserService, // circ dep issue
        private readonly moduleRef: ModuleRef,
    ) {}

    async addRoomMessage(createMessageDto: CreateMessageDto, roomId: number) {
        // ili je bolje ovo napraviti vec u room kontroleru?
        //add safety
        return this.messageRepository.save({
            room: { roomId },
            user: { userId: createMessageDto.userId },
            ...createMessageDto,
        });
    }

    async getRoomMessages(roomId: string): Promise<Array<Message>> {
        const roomIdParsed = parseInt(roomId);
        const messages = await this.messageRepository.find({
            where: { roomId: roomIdParsed },
        });

        // const messages1 = await this.messageRepository
        //     .createQueryBuilder('message')
        //     .where('message.room_id = :roomId', { roomId: roomIdParsed })
        //     .getMany();

        return messages;
    }

    /**
     *
     * @param roomId
     * @param userId
     */
    async getRoomMessagesAfterJoin(roomId: number, userId: number): Promise<Array<Message>> {
        this.roomUserService = this.moduleRef.get(RoomUserService, {
            strict: false,
        });

        const roomUser = await this.roomUserService.getRoomUserByUserId(roomId, userId);

        if (!roomUser) {
            throw new Error('Room user not found.');
        }
        //add checks if date is valid etd
        // const userJoinDate = new Date(roomUser.updatedAt); //not needed
        const userJoinDate = roomUser.updatedAt; //not needed

        const messages = await this.messageRepository.find({
            where: {
                roomId,
                createdAt: MoreThan(userJoinDate), //automatski pretvorba usporedi Date() i iso string iz db
            },
        });

        return messages;
    }

    async getMessage(id: number) {
        return `This action returns a #${id} message`;
    }

    async updateMessage(id: number, updateMessageDto: UpdateMessageDto) {
        return `This action updates a #${id} message`;
    }

    async deleteMessage(id: number) {
        return `This action removes a #${id} message`;
    }
}
