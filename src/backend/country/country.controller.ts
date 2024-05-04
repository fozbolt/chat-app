import { Body, Controller, Get, Post } from '@nestjs/common';
import { Country } from '@root/backend/country/entities/country.entity';

import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/createCountry.dto';

@Controller('country')
export class CountryController {
    public constructor(private readonly countryService: CountryService) {}

    @Post('add-country')
    public async addCountryAction(@Body() createCountryDto: CreateCountryDto): Promise<{ data: CreateCountryDto; message: string; status: number }> {
        return await this.countryService.addCountry(createCountryDto);
    }

    @Get('get-countries')
    public async getCountriesAction(): Promise<Array<Country>> {
        return await this.countryService.getCountries();
    }

    // TODO
    // @Get('get-country/:id')
    // public async getCountryAction(@Param('id') id: string) {
    //     return this.countryService.getCountry(+id);
    // }
    //
    // @Patch('updateRoom-country/:id')
    // public async updateCountryAction(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    //     return this.countryService.updateCountry(+id, updateCountryDto);
    // }
    //
    // @Delete('delete-country/:id')
    // public  async deleteCountryAction(@Param('id') id: string) {
    //     return this.countryService.deleteCountry(+id);
    // }
}
