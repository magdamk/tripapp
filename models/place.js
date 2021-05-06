const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        rquired: true
    },
    city: {
        type: String,
        rquired: false
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
        rquired: false
    },
    costToVisit: {
        type: Number,
        rquired: true
    },
    timeToVisit: {
        type: Number,
        rquired: true
    }
});

module.exports = mongoose.model('Place', placeSchema);