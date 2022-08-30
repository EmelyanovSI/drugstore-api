import { Router } from 'express';
import DrugsController from '@controllers/drugs.controller';
import { Routes } from '@interfaces/routes.interface';

class DrugsRoute implements Routes {
    public path = '/drugs';
    public router = Router();
    public drugsController = new DrugsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.drugsController.getDrugs);
        this.router.get(`${this.path}/:id`, this.drugsController.getDrugById);
        this.router.get(`/:country${this.path}`, this.drugsController.getDrugsByCountry);
        this.router.post(`${this.path}`, this.drugsController.createDrug);
        this.router.post(`${this.path}/list`, this.drugsController.getDrugsByIds);
        this.router.post(`${this.path}/delete`, this.drugsController.deleteDrugsByIds);
        this.router.put(`${this.path}/:id`, this.drugsController.updateDrug);
        this.router.delete(`${this.path}/:id`, this.drugsController.deleteDrug);
    }
}

export default DrugsRoute;
