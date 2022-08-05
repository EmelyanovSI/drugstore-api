import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'countries', timestamps: true } })
class Country {
    @prop({ type: String, required: true })
    public name: string;

    public createdAt?: Date;
    public updatedAt?: Date;
}

const countriesModel = getModelForClass(Country);

export default countriesModel;
