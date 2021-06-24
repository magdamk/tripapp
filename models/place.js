const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        rquired: true
    },
    city: {
        type: String,
        rquired: true
    },
    description: {
        type: String,
        rquired: true
    },
    latitude: {
        type: Number,
        rquired: true
    },
    longitude: {
        type: Number,
        rquired: true
    },
    street: {
        type: String,
        rquired: true
    },
    costToVisit: {
        type: Number,
        rquired: true
    },
    timeToVisit: {
        type: Number,
        rquired: true
    },
    average: {
        type: Number,
        required: false
    },
    photoMain: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('Place', placeSchema);