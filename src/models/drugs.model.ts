import { prop, getModelForClass, modelOptions, mongoose } from '@typegoose/typegoose';

const ObjectId = mongoose.Types.ObjectId;

@modelOptions({ schemaOptions: { collection: 'substance', timestamps: true } })
class Substance {
    @prop({ type: Boolean, required: true })
    public activeSubstance: boolean;

    @prop({ type: String, required: true })
    public name: string;

    public createdAt?: Date;
    public updatedAt?: Date;
}

@modelOptions({ schemaOptions: { collection: 'drugs', timestamps: true } })
class Drug {
    @prop({ type: String, required: true })
    public name: string;

    @prop({ type: ObjectId, required: true })
    public country: string;

    @prop({ type: () => [Substance] })
    public composition: Substance[];

    @prop({ type: Number, required: false, min: 0.01 })
    public cost?: number;

    public createdAt?: Date;
    public updatedAt?: Date;
}

const drugsModel = getModelForClass(Drug);

export default drugsModel;
