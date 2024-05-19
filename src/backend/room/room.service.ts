import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    ) {}

    public async addRoom(createRoomDto: CreateRoomDto, userId: number): Promise<Room> {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const room = this.roomRepository.create({
            ...createRoomDto,
            createdBy: user,
        });

        return await this.roomRepository.save(room);
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
