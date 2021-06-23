const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        rquired: true
    },
    password: {
        type: String,
        rquired: true
    }
});

module.exports = mongoose.model('User', userSchema);