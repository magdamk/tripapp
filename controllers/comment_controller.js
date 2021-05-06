const Place = require('../models/place');
const Comment = require('../models/comment');
const comment = require('../models/comment');

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
    let comment;
    try {
        comment = await Comment.findById(req.params.id);
        if (comment == null) {
            return res.status(404).json({ message: "Comment not found" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    comment.proper = false;
    try {
        const deletedComment = await comment.save();
        res.json(deletedComment);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}