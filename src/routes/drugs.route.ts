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
        this.router.get(`/:country${this.path}`, this.drugs.getDrugsByCountry);
        this.router.get(`/:country${this.path}/count`, this.drugs.getDrugsCountByCountry);
        this.router.get(`/:country${this.path}/page/:number/count/:count`, this.drugs.getDrugsPageByCountry);
        this.router.get(`${this.path}/:id`, this.drugs.getDrugById);
        this.router.post(`${this.path}`, this.drugs.createDrug);
        this.router.post(`${this.path}/list`, this.drugs.getDrugsByIds);
        this.router.post(`${this.path}/delete`, this.drugs.deleteDrugsByIds);
        this.router.put(`${this.path}/:id`, this.drugs.updateDrug);
        this.router.delete(`${this.path}/:id`, this.drugs.deleteDrug);
    }
}

export default DrugsRoute;
