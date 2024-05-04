import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/entities/user.entity';
// import { MessageService } from '../message/message.service';
// import { Message } from '../message/entities/message.entity';
import { UserService } from '../user/user.service';
import { RoomUser } from './entities/roomUser.entity';
import { RoomUserController } from './roomUser.controller';
import { RoomUserService } from './roomUser.service';

@Module({
    controllers: [RoomUserController],
    imports: [TypeOrmModule.forFeature([RoomUser, User])],
    providers: [RoomUserService, UserService],

    // circ dep issue
    // imports: [TypeOrmModule.forFeature([RoomUser, Message, User])],
    // controllers: [RoomUserController],
    // providers: [RoomUserService, MessageService, UserService],
})
export class RoomUserModule {}
