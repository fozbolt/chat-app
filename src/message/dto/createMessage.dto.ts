import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMessageDto {
    @IsOptional()
    @IsInt()
    messageId?: number;

    @IsNotEmpty()
    @Type(() => Date)
    createdAt: Date;

    @IsNotEmpty()
    @IsInt()
    roomId: number;

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsString()
    messageText: string;

    @IsOptional()
    @Type(() => Date)
    removedAt?: Date;

    @IsOptional()
    @Type(() => Date)
    editedAt?: Date;

    @IsNotEmpty()
    @IsInt()
    isDeleted: number;
}
