import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { RoomUser } from '../roomUser/entities/roomUser.entity';
import { RoomUserService } from '../roomUser/roomUser.service';

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    controllers: [MessageController],
    providers: [MessageService],

    //removed because of circular dependency
    // imports: [TypeOrmModule.forFeature([Message, RoomUser])],
    // controllers: [MessageController],
    // providers: [MessageService, RoomUserService],
})
export class MessageModule {}
