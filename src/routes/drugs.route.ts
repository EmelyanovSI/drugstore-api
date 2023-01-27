import { Router } from 'express';
import DrugsController from '@controllers/drugs.controller';
import { Routes } from '@interfaces/routes.interface';

class DrugsRoute implements Routes {
    public path = '/drugs';
    public router = Router();
    public drugs = new DrugsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.drugs.getAllDrugs);
        this.router.get(`${this.path}/count`, this.drugs.getAllDrugsCount);
        this.router.get(`${this.path}/page/:number/count/:count`, this.drugs.getAllDrugsPage);
        this.router.get(`/:countryId${this.path}`, this.drugs.getDrugsByCountry);
        this.router.get(`/:countryId${this.path}/count`, this.drugs.getDrugsCountByCountry);
        this.router.get(`/:countryId${this.path}/page/:number/count/:count`, this.drugs.getDrugsPageByCountry);
        this.router.get(`${this.path}/:id`, this.drugs.getDrugById);
        this.router.post(`${this.path}`, this.drugs.createDrug);
        this.router.post(`${this.path}/list`, this.drugs.getDrugsByIds);
        this.router.post(`${this.path}/delete`, this.drugs.deleteDrugsByIds);
        this.router.put(`${this.path}/:id`, this.drugs.updateDrug);
        this.router.delete(`${this.path}/:id`, this.drugs.deleteDrug);
        this.router.get(`${this.path}/activeSubstance/:activeSubstance`, this.drugs.getDrugsByActiveSubstance);
        this.router.get(`${this.path}/activeSubstance/:activeSubstance/count`, this.drugs.getDrugsCountByActiveSubstance);
        this.router.get(`${this.path}/activeSubstance/:activeSubstance/page/:number/count/:count`, this.drugs.getDrugsPageByActiveSubstance);
    }
}

export default DrugsRoute;
