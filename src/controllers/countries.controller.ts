import { NextFunction, Request, Response } from 'express';
import { Country } from '@interfaces/countries.interface';
import CountriesService from '@services/countries.service';

class CountriesController {
    public countries = new CountriesService();

    public getAllCountries = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: Array<Country> = await this.countries.findAllCountries();

            res.status(200).json({ data, message: 'findAllCountries' });
        } catch (error) {
            next(error);
        }
    };

    public getCountryById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data: Country = await this.countries.findCountryById(id);

            res.status(200).json({ data, message: 'findCountryById' });
        } catch (error) {
            next(error);
        }
    };

    public createCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countryData: Country = req.body;
            const data: Country = await this.countries.createCountry(countryData);

            res.status(201).json({ data, message: 'createCountry' });
        } catch (error) {
            next(error);
        }
    };

    public updateCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const countryData: Country = req.body;
            const data: Country = await this.countries.updateCountry(id, countryData);

            res.status(200).json({ data, message: 'updateCountry' });
        } catch (error) {
            next(error);
        }
    };

    public deleteCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data: Country = await this.countries.deleteCountry(id);

            res.status(200).json({ data, message: 'deleteCountry' });
        } catch (error) {
            next(error);
        }
    };
}

export default CountriesController;
