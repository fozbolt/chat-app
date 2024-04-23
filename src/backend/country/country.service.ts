import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/createCountry.dto';
import { UpdateCountryDto } from './dto/updateCountry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
    ) {}

    async addCountry(createCountryDto: CreateCountryDto) {
        try {
            const createdCountry = await this.countryRepository.save(
                createCountryDto,
            );
            return {
                message: 'Country created successfully.',
                data: createdCountry,
                status: 201,
            };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
                throw new ConflictException('Country name must be unique.');
            } else {
                // Handle other errors if necessary
                throw error;
            }
        }
    }

    async getCountries() {
        return await this.countryRepository.find();
    }

    async getCountry(id: number) {
        return await `This action returns a #${id} country`;
    }

    async updateCountry(id: number, updateCountryDto: UpdateCountryDto) {
        return await `This action updates a #${id} country`;
    }

    async deleteCountry(id: number) {
        return await Promise;
    }
}
