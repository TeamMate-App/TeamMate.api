const mongoose = require("mongoose")
const average = require("../../data/average")


const sportSchema = mongoose.Schema (
    {
        name:{
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: false,
        },
        author:{
            type: String,
            require: false,
        },
        average:{
            type: String,
            enum: average   
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }],
       
    }
);

const Sports = mongoose.model("Sports", sportSchema);

module.exports = Sports;