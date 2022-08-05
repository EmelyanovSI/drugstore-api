import { Timestamps } from '@interfaces/timestamps.interface';

export interface Country extends Timestamps {
    _id?: string;
    name: string;
}
