const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    court: {
        type: mongoose.Schema.Types.ObjectsId,
        ref: 'Court'
    },
    message: {
        type: String,
        required:true,
    },
});

const Comment = mongoose.model('Comment', commentSchema);
module.export = Comment;