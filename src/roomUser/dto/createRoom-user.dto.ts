import { IsNotEmpty, IsEnum, IsOptional, IsDate } from 'class-validator';
import {ApprovalStatus} from "../enums/roomUsers.enum";

export class CreateRoomUserDto {
    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    room_id: number;

    @IsEnum(ApprovalStatus)
    @IsOptional()
    approval_status: ApprovalStatus;

    approved_at?: Date;

    @IsOptional()
    approved_by?: number;

    @IsDate()
    @IsOptional()
    left_at: Date;

    @IsDate()
    @IsNotEmpty()
    joined_at: Date;

    @IsNotEmpty()
    hash: string;
}
