import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';

import { User } from '../../user/entities/user.entity';
import { ApprovalStatus } from '../enums/roomUsers.enum';

export class CreateRoomUserDto {
    @IsOptional()
    userId: number;

    @IsOptional()
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
