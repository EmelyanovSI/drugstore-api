require('../models/db');

import mongoose = require('mongoose');

import { Request, Response, NextFunction } from 'express';
import { DrugDocument } from '../../types/drug';
import { ServerError } from '../../types/error';

const model = mongoose.model('Drug');

export = {
    getAll: (req: Request, res: Response, next: NextFunction) => {
        model.find().exec((err, drugs) => {
            err ? res.status(400).json(err) : res.status(200).json(drugs);
        });
    },
    get: (req: Request, res: Response, next: NextFunction) => {
        model.findById(req.params.id).exec((err: ServerError, drug: DrugDocument) => {
            err ? res.status(404).json(err)
                : drug ? res.status(200).json(drug)
                : res.status(404).json({
                    message: 'Id not found'
                });
        });
    },
    create: (req: Request, res: Response, next: NextFunction) => {
        model.create({
            country: req.body.country,
            name: req.body.name,
            composition: req.body.composition,
            cost: req.body.cost
        }, (err: ServerError, drug: DrugDocument) => {
            err ? res.status(400).json(err) : res.status(201).json(drug);
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
                    drug.save((error: ServerError, n_drug: DrugDocument) => {
                        error ? res.status(409).json(error) : res.status(200).json(n_drug);
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
        model.findOneAndDelete({ _id: req.params.id }).exec((err: ServerError, drug: DrugDocument) => {
            err ? res.status(404).json(err)
                : drug ? res.status(204).json(null)
                : res.status(404).json({
                    message: 'Id not found'
                });
        });
    },
    getByCountry: (req: Request, res: Response, next: NextFunction) => {
        model.find({ country: { $eq: req.body._id } }).exec((err, drugs) => {
            err ? res.status(400).json(err) : res.status(200).json(drugs);
        });
    }
};
