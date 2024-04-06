import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomUserDto } from './createRoom-user.dto';

export class UpdateRoomUserDto extends PartialType(CreateRoomUserDto) {}
