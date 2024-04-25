import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomUserDto } from './createRoomUser.dto';

export class UpdateRoomUserDto extends PartialType(CreateRoomUserDto) {}
