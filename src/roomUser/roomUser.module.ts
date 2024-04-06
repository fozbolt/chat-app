import { Module } from '@nestjs/common';
import { RoomUserService } from './roomUser.service';
import { RoomUserController } from './roomUser.controller';

@Module({
  controllers: [RoomUserController],
  providers: [RoomUserService]
})
export class RoomUserModule {}
