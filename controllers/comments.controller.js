const createError = require("http-errors");
const Comment = require("../models/Comments.model");

//get current comment
module.exports.get = (req, res, next) => {
    Comment.find()
    .then((comments) => {
        if (!comments) {
          next(createError(404, "Comment not found"));
        } else {
          res.status(200).json(comments);
        }
      })
      .catch(next);
    };

module.exports.create = (req, res, next) => {
  Comment.create(req.body).then((comment) => {  
       return res.status(201).json(comment);
   })
   .catch(next);
};

module.exports.getGameComment = (req, res, next) => {
    Comment.find()
    .then((comments) => {
        if (!comments) {
          next(createError(404, "Comment not found"));
        } else {
          res.status(200).json(comments);
        }
      })
      .catch(next);
    };