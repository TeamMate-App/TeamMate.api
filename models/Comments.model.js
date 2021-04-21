const mongoose = require('mongoose');
require("./User.model");
require("./Court.model");

const commentSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    court: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Court',
    },
    message: {
        type: String,
        required: true,
    },

});

const Comment = mongoose.model('Comment', commentSchema);
module.export = Comment;