import { IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    username: string;

    @IsOptional()
    isDeleted = 0;

    @IsOptional()
    @IsDate()
    createdAt: Date;

    @IsOptional()
    @IsDate()
    updatedAt: Date;

    @IsOptional()
    @IsDate()
    lastActiveAt: Date;

    @IsInt()
    @IsNotEmpty()
    roleId: number;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(200)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    phoneNumber: string;

    @IsInt()
    @IsNotEmpty()
    countryId: number;
}
