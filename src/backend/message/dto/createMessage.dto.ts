import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsOptional()
    @IsInt()
    messageId?: number;

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
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    removedAt?: Date;

    @IsOptional()
    @IsDate()
    editedAt?: Date; // TODO, removing ? results in not recognizing this and upper two as optional

    @IsOptional()
    @IsInt()
    isDeleted: number;
}
