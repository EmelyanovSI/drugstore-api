import mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

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
    country: {
        type: ObjectId,
        required: true
    },
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
