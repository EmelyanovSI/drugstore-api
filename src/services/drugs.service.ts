import { HttpException } from '@exceptions/HttpException';
import { Drug } from '@interfaces/drugs.interface';
import drugs from '@models/drugs.model';
import { isEmpty } from '@utils/util';

class DrugsService {
    public async findAllDrugs(): Promise<Array<Drug>> {
        return drugs.find();
    }

    public async countAllDrugs(): Promise<number> {
        return drugs.countDocuments({});
    }

    public async findDrugsPage(skip: number, limit: number): Promise<Array<Drug>> {
        return drugs.find().skip(skip).limit(limit);
    }

    public async findDrugsByCountry(countryId: string): Promise<Array<Drug>> {
        if (isEmpty(countryId)) throw new HttpException(400, 'CountryId is empty');

        const findDrugs: Array<Drug> = await drugs.find({ country: countryId });
        if (!findDrugs) throw new HttpException(409, 'Drugs doesn\'t exist');

        return findDrugs;
    }

    public async countDrugsByCountry(countryId: string): Promise<number> {
        return drugs.countDocuments({ country: countryId });
    }

    public async findDrugsPageByCountry(countryId: string, skip: number, limit: number): Promise<Array<Drug>> {
        return drugs.find({ country: countryId }).skip(skip).limit(limit);
    }

    public async findDrugById(drugId: string): Promise<Drug> {
        if (isEmpty(drugId)) throw new HttpException(400, 'DrugId is empty');

        const findDrug: Drug = await drugs.findOne({ _id: drugId });
        if (!findDrug) throw new HttpException(409, 'Drug doesn\'t exist');

        return findDrug;
    }

    public async createDrug(drugData: Drug): Promise<Drug> {
        if (isEmpty(drugData)) throw new HttpException(400, 'DrugData is empty');

        const findDrug: Drug = await drugs.findOne({ _id: drugData._id });
        if (findDrug) throw new HttpException(409, `This drug ${drugData._id} already exists`);

        return await drugs.create({ ...drugData });
    }

    public async findDrugsByIds(drugsIds: Array<string>): Promise<Array<Drug>> {
        if (isEmpty(drugsIds)) throw new HttpException(400, 'DrugsIds is empty');

        const findDrugs: Array<Drug> = await drugs.find({ _id: { $in: drugsIds } });
        if (!findDrugs) throw new HttpException(409, 'Drugs doesn\'t exist');

        return findDrugs;
    }

    public async updateDrug(drugId: string, drugData: Drug): Promise<Drug> {
        if (isEmpty(drugData)) throw new HttpException(400, 'DrugData is empty');

        const updateDrugById: Drug = await drugs.findByIdAndUpdate(drugId, { ...drugData });
        if (!updateDrugById) throw new HttpException(409, 'Drug doesn\'t exist');

        return updateDrugById;
    }

    public async deleteDrug(drugId: string): Promise<Drug> {
        const deleteDrugById: Drug = await drugs.findByIdAndDelete(drugId);
        if (!deleteDrugById) throw new HttpException(409, 'Drug doesn\'t exist');

        return deleteDrugById;
    }

    public async deleteDrugsByIds(drugsIds: Array<string>): Promise<number> {
        const { deletedCount } = await drugs.deleteMany({ _id: { $in: drugsIds } });
        if (!deletedCount) throw new HttpException(409, 'Drugs doesn\'t exist');

        return deletedCount;
    }

    public async findDrugsByActiveSubstance(activeSubstance: string): Promise<Array<Drug>> {
        if (isEmpty(activeSubstance)) throw new HttpException(400, 'Active substance is empty');

        const findDrugs: Array<Drug> = await drugs.find({
            composition: {
                $elemMatch: {
                    name: { $regex: activeSubstance },
                    activeSubstance: true
                }
            }
        });
        if (!findDrugs) throw new HttpException(409, 'Drugs doesn\'t exist');

        return findDrugs;
    }

    public async countDrugsByActiveSubstance(activeSubstance: string): Promise<number> {
        return drugs.countDocuments({
            composition: {
                $elemMatch: {
                    name: { $regex: activeSubstance },
                    activeSubstance: true
                }
            }
        });
    }

    public async findDrugsPageByActiveSubstance(activeSubstance: string, skip: number, limit: number): Promise<Array<Drug>> {
        return drugs.find({
            composition: {
                $elemMatch: {
                    name: { $regex: activeSubstance },
                    activeSubstance: true
                }
            }
        }).skip(skip).limit(limit);
    }
}

export default DrugsService;
