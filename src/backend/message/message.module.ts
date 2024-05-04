import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './entities/message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
// import { RoomUser } from '../roomUser/entities/roomUser.entity';
// import { RoomUserService } from '../roomUser/roomUser.service';

@Module({
    controllers: [MessageController],
    imports: [TypeOrmModule.forFeature([Message])],
    providers: [MessageService],

    //removed because of circular dependency
    // imports: [TypeOrmModule.forFeature([Message, RoomUser])],
    // controllers: [MessageController],
    // providers: [MessageService, RoomUserService],
})
export class MessageModule {}
