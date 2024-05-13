import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    @IsOptional()
    isPrivate = 0;

    @IsInt()
    @IsOptional()
    isDeleted = 0;

    @IsInt()
    @IsOptional()
    userId: number;

    @IsOptional()
    @IsDate()
    createdAt: Date;
}
