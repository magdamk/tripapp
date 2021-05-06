const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    nick: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dateOfVisit: {
        type: Date,
        required: true
    },
    commentDate: {
        type: Date,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    proper: {
        type: Boolean,
        required: true,
        default: true
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'place'
    }
});

module.exports = mongoose.model('comment', commentSchema);