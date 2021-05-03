const mongoose = require("mongoose");
require("./User.model");

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

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    sport: {
      type: [String],
      default: "Padel",
    },
    date: {
      type: Date,
    },
    image: {
      type: String,
      validate: {
        validator: (value) => {
          try {
            const url = new URL(value);

            return url.protocol === "http:" || url.protocol === "https:";
          } catch (err) {
            return false;
          }
        },
        message: () => "Invalid image URL",
      },
    },
    address: {
      type: String,
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
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

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
