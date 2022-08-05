import { Router } from 'express';
import CountriesController from '@controllers/countries.controller';
import { Routes } from '@interfaces/routes.interface';

class CountriesRoute implements Routes {
    public path = '/countries';
    public router = Router();
    public countriesController = new CountriesController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.countriesController.getCountries);
        this.router.get(`${this.path}/:id`, this.countriesController.getCountryById);
        this.router.post(`${this.path}`, this.countriesController.createCountry);
        this.router.put(`${this.path}/:id`, this.countriesController.updateCountry);
        this.router.delete(`${this.path}/:id`, this.countriesController.deleteCountry);
    }
}

export default CountriesRoute;
