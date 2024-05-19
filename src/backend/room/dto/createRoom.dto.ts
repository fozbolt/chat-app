import { User } from '@root/backend/user/entities/user.entity';
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
    @IsOptional() // TODO: make this requred if it will be passed from request, leave as is if it will be taken from context
    createdBy: User;

    @IsOptional()
    @IsDate()
    createdAt: Date;
}
