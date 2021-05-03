const createError = require("http-errors");
const Comment = require("../models/Comments.model");

//get current comment
module.exports.get = (req, res, next) => {
    Comment.findById(req.currentComment).then((comment) => {
        if (!comment) {
            next(createError(404, "Comment not found"));
        } else {
            res.json(comment);
        }
    });
};


module.exports.create = (req, res, next) => {
    Comment.findOne({ id: req.body })
        .then((comment) => {
            if (comment) {
                // Error if email is already in the database
                next(
                    createError(400, {
                        errors: { id: "The comment could not be saved" },
                    })
                );
            } else {
                // Comment creation
                Comment.create(req.body).then((comment) => {
                 
                    return res.status(201).json(comment);
                });
            }
        })
        .catch(next);
};