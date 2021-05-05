const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
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
  },


},
{
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret._v;
        return ret;
      },
    },
  }
);


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;