import { HttpException } from '@exceptions/HttpException';
import { Drug } from '@interfaces/drugs.interface';
import drugsModel from '@models/drugs.model';
import { isEmpty } from '@utils/util';

class DrugsService {
    public async findAllDrugs(): Promise<Array<Drug>> {
        return drugsModel.find();
    }

    public async findDrugById(drugId: string): Promise<Drug> {
        if (isEmpty(drugId)) throw new HttpException(400, 'DrugId is empty');

        const findDrug: Drug = await drugsModel.findOne({ _id: drugId });
        if (!findDrug) throw new HttpException(409, 'Drug doesn\'t exist');

        return findDrug;
    }

    public async findDrugsByCountry(countryId: string): Promise<Array<Drug>> {
        if (isEmpty(countryId)) throw new HttpException(400, 'CountryId is empty');

        const findDrugs: Array<Drug> = await drugsModel.find({ country: countryId });
        if (!findDrugs) throw new HttpException(409, 'Drugs doesn\'t exist');

        return findDrugs;
    }

    public async createDrug(drugData: Drug): Promise<Drug> {
        if (isEmpty(drugData)) throw new HttpException(400, 'DrugData is empty');

        const findDrug: Drug = await drugsModel.findOne({ _id: drugData._id });
        if (findDrug) throw new HttpException(409, `This drug ${drugData._id} already exists`);

        return await drugsModel.create({ ...drugData });
    }

    public async updateDrug(drugId: string, drugData: Drug): Promise<Drug> {
        if (isEmpty(drugData)) throw new HttpException(400, 'DrugData is empty');

        const updateDrugById: Drug = await drugsModel.findByIdAndUpdate(drugId, { ...drugData });
        if (!updateDrugById) throw new HttpException(409, 'Drug doesn\'t exist');

        return updateDrugById;
    }

    public async deleteDrug(drugId: string): Promise<Drug> {
        const deleteDrugById: Drug = await drugsModel.findByIdAndDelete(drugId);
        if (!deleteDrugById) throw new HttpException(409, 'Drug doesn\'t exist');

        return deleteDrugById;
    }
}

export default DrugsService;
