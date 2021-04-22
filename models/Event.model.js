const { date } = require("faker");
const mongoose = require("mongoose");
const sports = require("../constants/sports")
require("../models/User.model")

const EventSchema = mongoose.Schema(
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
      enum: sports
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

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
