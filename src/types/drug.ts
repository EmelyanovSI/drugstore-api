import {Document} from 'mongoose';
import {Substance} from './substance';

export interface Drug {
    name: string;
    composition: Array<Substance>;
    cost: number;
}

export interface DrugDocument extends Document, Drug {
}
