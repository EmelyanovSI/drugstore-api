require('../models/db');

import mongoose = require('mongoose');

import {Request, Response, NextFunction} from 'express';
import {DrugDocument} from '../../types/drug';
import {ServerError} from '../../types/error';

const model = mongoose.model('Drug');

export = {
    get: (req: Request, res: Response, next: NextFunction) => {
        model.findById(req.params.id).exec((err: ServerError, drug: DrugDocument) => {
            if (err) {
                res.status(404).json(err);
            } else {
                if (drug) {
                    res.status(200).json(drug);
                } else {
                    res.status(404).json({
                        message: 'Id not found'
                    });
                }
            }
        });
    },
    getAll: (req: Request, res: Response, next: NextFunction) => {
        model.find().exec((err, drugs) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(drugs);
            }
        });
    },
    create: (req: Request, res: Response, next: NextFunction) => {
        model.create({
            country: req.body.country,
            name: req.body.name,
            composition: req.body.composition,
            cost: req.body.cost
        }, (err: ServerError, drug: DrugDocument) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(drug);
            }
        });
    },
    update: (req: Request, res: Response, next: NextFunction) => {
        model.findById(req.params.id).exec((err: ServerError, drug: DrugDocument) => {
            if (err) {
                res.status(404).json(err);
            } else {
                if (drug) {
                    drug.country = req.body.country;
                    drug.name = req.body.name;
                    drug.composition = req.body.composition;
                    drug.cost = req.body.cost;
                    drug.save((error: ServerError, ndrug: DrugDocument) => {
                        if (error) {
                            res.status(409).json(error);
                        } else {
                            res.status(200).json(ndrug);
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
        model.findOneAndDelete({_id: req.params.id}).exec((err: ServerError, drug: DrugDocument) => {
            if (err) {
                res.status(404).json(err);
            } else {
                if (drug) {
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
