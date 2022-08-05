import { NextFunction, Request, Response } from 'express';
import { Country } from '@interfaces/countries.interface';
import CountriesService from '@services/countries.service';

class CountriesController {
    public countryService = new CountriesService();

    public getCountries = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllCountriesData: Array<Country> = await this.countryService.findAllCountries();

            res.status(200).json({ data: findAllCountriesData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getCountryById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countryId: string = req.params.id;
            const findOneCountryData: Country = await this.countryService.findCountryById(countryId);

            res.status(200).json({ data: findOneCountryData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countryData: Country = req.body;
            const createCountryData: Country = await this.countryService.createCountry(countryData);

            res.status(201).json({ data: createCountryData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countryId: string = req.params.id;
            const countryData: Country = req.body;
            const updateCountryData: Country = await this.countryService.updateCountry(countryId, countryData);

            res.status(200).json({ data: updateCountryData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countryId: string = req.params.id;
            const deleteCountryData: Country = await this.countryService.deleteCountry(countryId);

            res.status(200).json({ data: deleteCountryData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default CountriesController;
