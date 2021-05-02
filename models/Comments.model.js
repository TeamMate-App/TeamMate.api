const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  },
  message: {
    type: String,
  },

  author: {
    type: String,
  },
  body: {
    type: String
  }

});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;