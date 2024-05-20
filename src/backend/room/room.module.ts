import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomUser } from '@root/backend/roomUser/entities/roomUser.entity';
import { RoomUserService } from '@root/backend/roomUser/roomUser.service';
import { User } from '@root/backend/user/entities/user.entity';
import { UserService } from '@root/backend/user/user.service';

import { Message } from '../message/entities/message.entity';
import { MessageService } from '../message/message.service';
import { Room } from './entities/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
    imports: [TypeOrmModule.forFeature([Room, Message, User, RoomUser])],
    controllers: [RoomController],
    providers: [RoomService, MessageService, UserService, RoomUserService],
})
export class RoomModule {}
