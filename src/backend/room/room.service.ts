import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ) {}

    async addRoom(createRoomDto: CreateRoomDto) {
        return await this.roomRepository.save(createRoomDto);
    }

    async getRooms() {
        return await this.roomRepository.find();
    }

    getRoom(id: number) {
        return `This action returns a #${id} room`;
    }

    updateRoom(id: number, updateRoomDto: UpdateRoomDto) {
        return `This action updates a #${id} room`;
    }

    deleteRoom(id: number) {
        return `This action removes a #${id} room`;
    }
}
