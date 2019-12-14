require('../models/db');

import mongoose = require('mongoose');

import {Request, Response, NextFunction} from 'express';
import {CountryDocument} from '../../types/country';
import {ServerError} from '../../types/error';

const model = mongoose.model('Country');

export = {
    get: (req: Request, res: Response, next: NextFunction) => {
        model.findById(req.params.id).exec((err: ServerError, country: CountryDocument) => {
            if (err) {
                res.status(404).json(err);
            } else {
                if (country) {
                    res.status(200).json(country);
                } else {
                    res.status(404).json({
                        message: 'Id not found'
                    });
                }
            }
        });
    },
    getAll: (req: Request, res: Response, next: NextFunction) => {
        model.find().exec((err, countries) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(countries);
            }
        });
    },
    create: (req: Request, res: Response, next: NextFunction) => {
        model.create({
            name: req.body.name
        }, (err: ServerError, country: CountryDocument) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(country);
            }
        });
    },
    update: (req: Request, res: Response, next: NextFunction) => {
        model.findById(req.params.id).exec((err: ServerError, country: CountryDocument) => {
            if (err) {
                res.status(404).json(err);
            } else {
                if (country) {
                    country.name = req.body.name;
                    country.save((error: ServerError, ncountry: CountryDocument) => {
                        if (error) {
                            res.status(409).json(error);
                        } else {
                            res.status(200).json(ncountry);
                        }
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
        model.findOneAndDelete({_id: req.params.id}).exec((err: ServerError, country: CountryDocument) => {
            if (err) {
                res.status(404).json(err);
            } else {
                if (country) {
                    res.status(204).json(null);
                } else {
                    res.status(404).json({
                        message: 'Id not found'
                    });
                }
            }
        });
    }
};
