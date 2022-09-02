import { NextFunction, Request, Response } from 'express';
import { Drug } from '@interfaces/drugs.interface';
import DrugsService from '@services/drugs.service';

class DrugsController {
    public drugs = new DrugsService();

    public getAllDrugs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: Array<Drug> = await this.drugs.findAllDrugs();

            res.status(200).json({ data, message: 'findAllDrugs' });
        } catch (error) {
            next(error);
        }
    };

    public getAllDrugsCount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: number = await this.drugs.countAllDrugs();

            res.status(200).json({ data, message: 'countAllDrugs' });
        } catch (error) {
            next(error);
        }
    };

    public getAllDrugsPage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNumber: number = +req.params.number;
            const listCount: number = +req.params.count;
            const skipCount: number = pageNumber * listCount;
            const count: number = await this.drugs.countAllDrugs();
            const drugs: Array<Drug> = await this.drugs.findDrugsPage(skipCount, listCount);

            res.status(200).json({ data: { count, drugs }, message: 'findDrugsPage' });
        } catch (error) {
            next(error);
        }
    };

    public getDrugsByCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { countryId } = req.params;
            const data: Array<Drug> = await this.drugs.findDrugsByCountry(countryId);

            res.status(200).json({ data, message: 'findDrugsByCountry' });
        } catch (error) {
            next(error);
        }
    };

    public getDrugsCountByCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countryId: string = req.params.country;
            const data: number = await this.drugs.countDrugsByCountry(countryId);

            res.status(200).json({ data, message: 'countDrugsByCountry' });
        } catch (error) {
            next(error);
        }
    };

    public getDrugsPageByCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { countryId } = req.params;
            const pageNumber: number = +req.params.number;
            const listCount: number = +req.params.count;
            const skipCount: number = pageNumber * listCount;
            const count: number = await this.drugs.countDrugsByCountry(countryId);
            const drugs: Array<Drug> = await this.drugs.findDrugsPageByCountry(countryId, skipCount, listCount);

            res.status(200).json({ data: { count, drugs }, message: 'findDrugsPageByCountry' });
        } catch (error) {
            next(error);
        }
    };

    public getDrugById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data: Drug = await this.drugs.findDrugById(id);

            res.status(200).json({ data, message: 'findDrugById' });
        } catch (error) {
            next(error);
        }
    };

    public createDrug = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const drugData: Drug = req.body;
            const data: Drug = await this.drugs.createDrug(drugData);

            res.status(201).json({ data, message: 'createDrug' });
        } catch (error) {
            next(error);
        }
    };

    public getDrugsByIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const drugsIds: Array<string> = req.body;
            const data: Array<Drug> = await this.drugs.findDrugsByIds(drugsIds);

            res.status(200).json({ data, message: 'findDrugsByIds' });
        } catch (error) {
            next(error);
        }
    };

    public updateDrug = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const drugData: Drug = req.body;
            const data: Drug = await this.drugs.updateDrug(id, drugData);

            res.status(200).json({ data, message: 'updateDrug' });
        } catch (error) {
            next(error);
        }
    };

    public deleteDrug = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data: Drug = await this.drugs.deleteDrug(id);

            res.status(200).json({ data, message: 'deleteDrug' });
        } catch (error) {
            next(error);
        }
    };

    public deleteDrugsByIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const drugsIds: Array<string> = req.body;
            const deletedCount: number = await this.drugs.deleteDrugsByIds(drugsIds);

            res.status(200).json({ data: { deletedCount }, message: 'deleteDrugsByIds' });
        } catch (error) {
            next(error);
        }
    };
}

export default DrugsController;
