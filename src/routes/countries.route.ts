import { Router } from 'express';
import CountriesController from '@controllers/countries.controller';
import { Routes } from '@interfaces/routes.interface';

class CountriesRoute implements Routes {
    public path = '/countries';
    public router = Router();
    public countries = new CountriesController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.countries.getAllCountries);
        this.router.get(`${this.path}/:id`, this.countries.getCountryById);
        this.router.post(`${this.path}`, this.countries.createCountry);
        this.router.put(`${this.path}/:id`, this.countries.updateCountry);
        this.router.delete(`${this.path}/:id`, this.countries.deleteCountry);
    }
}

export default CountriesRoute;
