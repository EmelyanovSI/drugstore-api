import { NextFunction, Request, Response } from 'express';
import { Drug } from '@interfaces/drugs.interface';
import DrugsService from '@services/drugs.service';

class DrugsController {
    public drugService = new DrugsService();

    public getAllDrugs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllDrugsData: Array<Drug> = await this.drugService.findAllDrugs();

            res.status(200).json({ data: findAllDrugsData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getAllDrugsCount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const count: number = await this.drugService.countAllDrugs();
            res.status(200).json({ data: { count }, message: 'findCount' });
        } catch (error) {
            next(error);
        }
    };

    public getAllDrugsPage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNumber: number = +req.params.number;
            const listCount: number = +req.params.count;
            const skipCount = pageNumber * listCount;
            const drugsCount: number = await this.drugService.countAllDrugs();
            const findDrugsData: Array<Drug> = await this.drugService.findDrugsPage(skipCount, listCount);
            res.status(200).json({
                data: {
                    count: drugsCount,
                    drugs: findDrugsData
                },
                message: 'findSome'
            });
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

    public getDrugsCountByCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countryId: string = req.params.country;
            const count: number = await this.drugService.countDrugsByCountry(countryId);
            res.status(200).json({ data: { count }, message: 'findCount' });
        } catch (error) {
            next(error);
        }
    };

    public getDrugsPageByCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countryId: string = req.params.country;
            const pageNumber: number = +req.params.number;
            const listCount: number = +req.params.count;
            const skipCount = pageNumber * listCount;
            const drugsCount: number = await this.drugService.countDrugsByCountry(countryId);
            const findDrugsData: Array<Drug> = await this.drugService.findDrugsPageByCountry(countryId, skipCount, listCount);
            res.status(200).json({
                data: {
                    count: drugsCount,
                    drugs: findDrugsData
                },
                message: 'findSome'
            });
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

    public createDrug = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const drugData: Drug = req.body;
            const createDrugData: Drug = await this.drugService.createDrug(drugData);

            res.status(201).json({ data: createDrugData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public getDrugsByIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const drugsIds: Array<string> = req.body;
            const findDrugsData: Array<Drug> = await this.drugService.findDrugsByIds(drugsIds);

            res.status(200).json({ data: findDrugsData, message: 'findQuery' });
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

    public deleteDrugsByIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const drugsIds: Array<string> = req.body;
            const deletedCount: number = await this.drugService.deleteDrugsByIds(drugsIds);

            res.status(200).json({ data: { deletedCount }, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default DrugsController;
