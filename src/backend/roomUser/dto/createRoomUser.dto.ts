import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { User } from '../../user/entities/user.entity';
import { ApprovalStatus } from '../enums/roomUsers.enum';

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
    @IsOptional()
    createdAt: Date;

    @IsOptional()
    hash: string;
}
