import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';

export class CreateCountryDto {
    @IsOptional()
    countryId: number;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 2)
    countryCode: string;

    @IsOptional()
    @IsString()
    @Length(0, 30)
    locale: string;

    @IsNotEmpty()
    createdAt: Date;

    @IsNotEmpty()
    updatedAt: Date;
}