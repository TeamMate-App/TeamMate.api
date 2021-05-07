const mongoose = require("mongoose");
require("./User.model");
const mongooseDateFormat = require("mongoose-date-format");

const GameSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: false,
    },

    comments: {
      type: [mongoose.Types.ObjectId],
      ref: "comment",
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    players: {
      type: mongoose.Types.ObjectId,
      ref: "inscription",
    },
    sport: {
      type: [String],
      default: "Padel",
    },
    date: {
      type: Date,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/teammatereact258/image/upload/v1620345498/Teammate/pistas-padel-default_k3ihn7.jpg",
    },
    address: {
      type: String,
    },

    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"],
        default: "Point", // 'location.type' must be 'Point'
        /* required: true, */
      },
      coordinates: {
        type: [Number],
        required: true
      }
   
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

GameSchema.plugin(mongooseDateFormat);

// Game - inscription
GameSchema.virtual("inscription", {
  ref: "inscription",
  localField: "_id",
  foreignField: "game",
});
// Game - User
GameSchema.virtual("User", {
  ref: "User",
  localField: "_id",
  foreignField: "game",
});
//Game - comments
GameSchema.virtual("Comment", {
  ref: "comment",
  localField: "_id",
  foreignField: "game",
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
