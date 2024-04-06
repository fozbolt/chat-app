import {
    IsNotEmpty,
    IsBoolean,
    IsInt,
    IsOptional,
    IsString,
    IsDate,
} from 'class-validator';

// ovo je nedovrseno
export class CreateRoomDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    isPrivate: number;

    @IsInt()
    isDeleted: number;

    @IsInt()
    @IsOptional()
    userId?: number;

    @IsNotEmpty()
    @IsDate()
    createdAt: Date;
}
