import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCountryDto } from './dto/createCountry.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
    public constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
    ) {}

    public async addCountry(createCountryDto: CreateCountryDto): Promise<{ data: CreateCountryDto; message: string; status: number }> {
        try {
            const createdCountry = await this.countryRepository.save(createCountryDto);
            return {
                data: createdCountry,
                message: 'Country created successfully.',
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

    public async getCountries(): Promise<Array<Country>> {
        return await this.countryRepository.find();
    }

    // TODO
    // private getCountry(id: number): unknown {
    //     return Promise.resolve(`Country with ID ${id}`);
    // }
    //
    // private async updateCountry(id: number, updateCountryDto: UpdateCountryDto): Promise<unknown> {
    //     return `This action updates a #${id} country`;
    // }
    //
    // private async deleteCountry(id: number): Promise<unknown> {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     const dummyVarToSkipEslint = id;
    //     return Promise;
    // }
}
