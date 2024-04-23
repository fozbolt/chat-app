import { IsNotEmpty, IsInt, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateRoomDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    @IsOptional()
    isPrivate: number;

    @IsInt()
    @IsOptional()
    isDeleted: number;

    @IsInt()
    @IsOptional()
    userId: number;

    @IsOptional()
    @IsDate()
    createdAt: Date;
}
