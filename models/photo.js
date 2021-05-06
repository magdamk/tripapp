const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'place'
    }
});

module.exports = mongoose.model('photo', photoSchema);