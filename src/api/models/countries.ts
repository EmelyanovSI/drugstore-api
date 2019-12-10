import mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

mongoose.model('Country', countrySchema);
