import { Timestamps } from '@interfaces/timestamps.interface';

export interface Substance extends Timestamps {
    _id?: string;
    name: string;
    activeSubstance: boolean;
}
