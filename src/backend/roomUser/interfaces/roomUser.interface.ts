import { RoomUser } from '@root/backend/roomUser/entities/roomUser.entity';

export interface UserHashAndRoomUsersList {
    roomUserHash: string;
    roomUsers?: Array<RoomUser>;
}
