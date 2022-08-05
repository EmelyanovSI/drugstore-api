import { HttpException } from '@exceptions/HttpException';
import { Country } from '@interfaces/countries.interface';
import countriesModel from '@models/countries.model';
import { isEmpty } from '@utils/util';

class CountriesService {
    public async findAllCountries(): Promise<Array<Country>> {
        return countriesModel.find();
    }

    public async findCountryById(countryId: string): Promise<Country> {
        if (isEmpty(countryId)) throw new HttpException(400, 'CountryId is empty');

        const findCountry: Country = await countriesModel.findOne({ _id: countryId });
        if (!findCountry) throw new HttpException(409, 'Country doesn\'t exist');

        return findCountry;
    }

    public async createCountry(countryData: Country): Promise<Country> {
        if (isEmpty(countryData)) throw new HttpException(400, 'CountryData is empty');

        const findCountry: Country = await countriesModel.findOne({ _id: countryData._id });
        if (findCountry) throw new HttpException(409, `This Country ${countryData._id} already exists`);

        return await countriesModel.create({ ...countryData });
    }

    public async updateCountry(countryId: string, countryData: Country): Promise<Country> {
        if (isEmpty(countryData)) throw new HttpException(400, 'CountryData is empty');

        const updateCountryById: Country = await countriesModel.findByIdAndUpdate(countryId, { ...countryData });
        if (!updateCountryById) throw new HttpException(409, 'Country doesn\'t exist');

        return updateCountryById;
    }

    public async deleteCountry(countryId: string): Promise<Country> {
        const deleteCountryById: Country = await countriesModel.findByIdAndDelete(countryId);
        if (!deleteCountryById) throw new HttpException(409, 'Country doesn\'t exist');

        return deleteCountryById;
    }
}

export default CountriesService;
