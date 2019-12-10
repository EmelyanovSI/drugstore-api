import mongoose = require('mongoose');

const substanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    activeSubstance: {
        type: Boolean,
        required: true
    }
});

const drugSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    composition: {
        type: [substanceSchema],
        required: true
    },
    cost: {
        type: Number,
        required: false,
        min: 0.01
    }
});

mongoose.model('Drug', drugSchema);
