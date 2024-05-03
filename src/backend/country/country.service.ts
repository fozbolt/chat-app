import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/createCountry.dto';
import { UpdateCountryDto } from './dto/updateCountry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
    private constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
    ) {}

    private async addCountry(createCountryDto: CreateCountryDto): Promise<unknown> {
        try {
            const createdCountry = await this.countryRepository.save(createCountryDto);
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

    private async getCountries(): Promise<unknown> {
        return this.countryRepository.find();
    }

    private async getCountry(id: number): Promise<string> {
        return `This action returns a #${id} country`;
    }

    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    private async updateCountry(id: number, updateCountryDto: UpdateCountryDto): Promise<unknown> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dummyVarToSkipEslint = updateCountryDto;
        return `This action updates a #${id} country`;
    }

    private async deleteCountry(id: number): Promise<unknown> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dummyVarToSkipEslint = id;
        return Promise;
    }
}
