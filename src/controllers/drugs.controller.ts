import { NextFunction, Request, Response } from 'express';
import { Drug } from '@interfaces/drugs.interface';
import DrugsService from '@services/drugs.service';

class DrugsController {
    public drugService = new DrugsService();

    public getDrugs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllDrugsData: Array<Drug> = await this.drugService.findAllDrugs();

            res.status(200).json({ data: findAllDrugsData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getDrugById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const drugId: string = req.params.id;
            const findOneDrugData: Drug = await this.drugService.findDrugById(drugId);

            res.status(200).json({ data: findOneDrugData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public getDrugsByCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countryId: string = req.params.country;
            const findDrugsData: Array<Drug> = await this.drugService.findDrugsByCountry(countryId);

            res.status(200).json({ data: findDrugsData, message: 'findQuery' });
        } catch (error) {
            next(error);
        }
    };

    public createDrug = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const drugData: Drug = req.body;
            const createDrugData: Drug = await this.drugService.createDrug(drugData);

            res.status(201).json({ data: createDrugData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateDrug = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const drugId: string = req.params.id;
            const drugData: Drug = req.body;
            const updateDrugData: Drug = await this.drugService.updateDrug(drugId, drugData);

            res.status(200).json({ data: updateDrugData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteDrug = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const drugId: string = req.params.id;
            const deleteDrugData: Drug = await this.drugService.deleteDrug(drugId);

            res.status(200).json({ data: deleteDrugData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default DrugsController;
