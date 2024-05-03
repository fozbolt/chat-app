import { IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    readonly username: string;

    @IsOptional()
    readonly isDeleted: number;

    @IsOptional()
    @IsDate()
    readonly createdAt: Date;

    @IsOptional()
    @IsDate()
    readonly updatedAt: Date;

    @IsNotEmpty()
    @IsDate()
    readonly lastActiveAt: Date;

    @IsInt()
    @IsNotEmpty()
    readonly roleId: number;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(200)
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    readonly phoneNumber: string;

    @IsInt()
    @IsNotEmpty()
    readonly countryId: number;
}
