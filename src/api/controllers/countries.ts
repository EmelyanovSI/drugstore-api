require('../models/db');

import mongoose = require('mongoose');

import { Request, Response, NextFunction } from 'express';
import { CountryDocument } from '../../types/country';
import { ServerError } from '../../types/error';

const model = mongoose.model('Country');

export = {
    getAll: (req: Request, res: Response, next: NextFunction) => {
        model.find().exec((err, countries) => {
            err ? res.status(400).json(err) : res.status(200).json(countries);
        });
    },
    get: (req: Request, res: Response, next: NextFunction) => {
        model.findById(req.params.id).exec((err: ServerError, country: CountryDocument) => {
            err ? res.status(404).json(err)
                : country ? res.status(200).json(country)
                    : res.status(404).json({
                        message: 'Id not found'
                    });
        });
    },
    create: (req: Request, res: Response, next: NextFunction) => {
        model.create({
            name: req.body.name
        }, (err: ServerError, country: CountryDocument) => {
            err ? res.status(400).json(err) : res.status(201).json(country);
        });
    },
    update: (req: Request, res: Response, next: NextFunction) => {
        model.findById(req.params.id).exec((err: ServerError, country: CountryDocument) => {
            if (err) {
                res.status(404).json(err);
            } else {
                if (country) {
                    country.name = req.body.name;
                    country.save((error: ServerError, n_country: CountryDocument) => {
                        error ? res.status(409).json(error) : res.status(200).json(n_country);
                    });
                } else {
                    res.status(404).json({
                        message: 'Id not found'
                    });
                }
            }
        });
    },
    remove: (req: Request, res: Response, next: NextFunction) => {
        model.findOneAndDelete({ _id: req.params.id }).exec((err: ServerError, country: CountryDocument) => {
            err ? res.status(404).json(err)
                : country
                    ? res.status(204).json(null)
                    : res.status(404).json({
                        message: 'Id not found'
                    });
        });
    }
};
