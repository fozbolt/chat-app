import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/createCountry.dto';
import { UpdateCountryDto } from './dto/updateCountry.dto';

@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @Post('add-country')
    async addCountryAction(@Body() createCountryDto: CreateCountryDto) {
        return this.countryService.addCountry(createCountryDto);
    }

    @Get('get-countries')
    async getCountriesAction() {
        return this.countryService.getCountries();
    }

    @Get('get-country/:id')
    async getCountryAction(@Param('id') id: string) {
        return this.countryService.getCountry(+id);
    }

    @Patch('updateRoom-country/:id')
    async updateCountryAction(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
        return this.countryService.updateCountry(+id, updateCountryDto);
    }

    @Delete('delete-country/:id')
    async deleteCountryAction(@Param('id') id: string) {
        return this.countryService.deleteCountry(+id);
    }
}
