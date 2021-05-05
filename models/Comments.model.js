const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  game: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Game'
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