import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@root/backend/user/entities/user.entity';
import { UserService } from '@root/backend/user/user.service';

import { Message } from '../message/entities/message.entity';
import { MessageService } from '../message/message.service';
import { Room } from './entities/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
    imports: [TypeOrmModule.forFeature([Room, Message, User])],
    controllers: [RoomController],
    providers: [RoomService, MessageService, UserService],
})
export class RoomModule {}
