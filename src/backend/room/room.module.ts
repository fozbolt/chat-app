import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Message } from '../message/entities/message.entity';
import { MessageService } from '../message/message.service';

@Module({
    imports: [TypeOrmModule.forFeature([Room, Message])],
    controllers: [RoomController],
    providers: [RoomService, MessageService],
})
export class RoomModule {}
