import { IsNotEmpty, IsEnum, IsOptional, IsDate, IsNumber } from 'class-validator';
import { ApprovalStatus } from '../enums/roomUsers.enum.js';
import { User } from '../../user/entities/user.entity.js';

export class CreateRoomUserDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    roomId: number;

    @IsEnum(ApprovalStatus)
    @IsOptional()
    approvalStatus: ApprovalStatus;

    @IsDate()
    @IsOptional()
    updatedAt: Date;

    @IsNumber()
    @IsOptional()
    updatedBy: User;

    @IsDate()
    @IsOptional()
    leftAt: Date;

    @IsDate()
    @IsNotEmpty()
    requestedAt: Date;

    @IsOptional()
    hash: string;
}
