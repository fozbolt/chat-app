import { Module } from '@nestjs/common';
import { RoomUserService } from './roomUser.service';
import { RoomUserController } from './roomUser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomUser } from './entities/roomUser.entity';
// import { MessageService } from '../message/message.service';
// import { Message } from '../message/entities/message.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RoomUser, User])],
    controllers: [RoomUserController],
    providers: [RoomUserService, UserService],

    // circ dep issue
    // imports: [TypeOrmModule.forFeature([RoomUser, Message, User])],
    // controllers: [RoomUserController],
    // providers: [RoomUserService, MessageService, UserService],
})
export class RoomUserModule {}
