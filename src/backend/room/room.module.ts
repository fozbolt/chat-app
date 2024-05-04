import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from '../message/entities/message.entity';
import { MessageService } from '../message/message.service';
import { Room } from './entities/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
    imports: [TypeOrmModule.forFeature([Room, Message])],
    controllers: [RoomController],
    providers: [RoomService, MessageService],
})
export class RoomModule {}
