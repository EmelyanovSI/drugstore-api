import { Document } from 'mongoose';

export interface Country {
    name: string;
}

export interface CountryDocument extends Document, Country {}
