const Place = require('../models/place');
const Comment = require('../models/comment');

exports.getCommentsForPlace = async(req, res) => {
    let place = req.body.place;
    try {
        let commentsForPlace = await Comment.find({ place: place._id, proper: true });
        res.json(commentsForPlace);
    } catch (err) { res.status(404).json({ message: "No comments found for place " + place._id }) }
}

exports.createCommentForPlace = async(req, res) => {
    const place = req.body.place;
    const newComment = new Comment({
        nick: req.body.nick,
        title: req.body.title,
        content: req.body.content,
        dateOfVisit: req.body.dateOfVisit,
        commentDate: new Date(),
        rate: req.body.rate,
        proper: true,
        place: place._id
    })
    try {
        const addedComment = await newComment.save();
        res.status(201).json(addedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
exports.markCommentNotProper = async(req, res) => {
    const comment = req.body.comment;
    if (!req.body.proper) {

        try {
            const deletedComment = await place.save();
            res.json(deletedComment);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
}