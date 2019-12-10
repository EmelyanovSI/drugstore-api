import {Document} from 'mongoose';

export interface Substance {
    name: string;
    activeSubstance: boolean
}

export interface SubstanceDocument extends Document, Substance {
}
