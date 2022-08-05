import { Substance } from '@interfaces/substacne.interface';
import { Timestamps } from '@interfaces/timestamps.interface';

export interface Drug extends Timestamps {
    _id?: string;
    name: string;
    country: string;
    composition: Array<Substance>;
    cost?: number;
}
