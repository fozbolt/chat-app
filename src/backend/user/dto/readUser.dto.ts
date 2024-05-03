import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReadUserDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @IsNotEmpty()
    @IsDate()
    lastActiveAt: Date;

    @IsNotEmpty()
    @IsNumber()
    roleId: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsNotEmpty()
    @IsNumber()
    countryId: number;
}
