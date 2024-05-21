import { Room } from '@root/backend/room/entities/room.entity';

export interface AddRoomResult {
    success: boolean;
    message: string;
    data?: Room;
}
