const mongoose = require("mongoose")



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
        user:{
            type: Schema.ObjectId,
            ref: "User"
        },
      
       
       
    }
);

const Sports = mongoose.model("Sports", sportSchema);

module.exports = Sports;