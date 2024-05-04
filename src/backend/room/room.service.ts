import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoomDto } from './dto/createRoom.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
    public constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ) {}

    public async addRoom(createRoomDto: CreateRoomDto): Promise<CreateRoomDto> {
        return await this.roomRepository.save(createRoomDto);
    }

    public async getRooms(): Promise<Array<Room>> {
        return await this.roomRepository.find();
    }

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
