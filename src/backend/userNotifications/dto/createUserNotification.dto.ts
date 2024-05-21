// notification.dto.ts

import { IsInt, IsNotEmpty, IsString } from 'class-validator';

//TODO
export class CreateUserNotificationDto {
    @IsNotEmpty()
    @IsString()
    message: string;

    @IsNotEmpty()
    @IsInt()
    userId: number; // ID of the user who receives the notification

    @IsNotEmpty()
    @IsInt()
    sentBy: number; // ID of the user who sent the notification
}
