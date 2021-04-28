const mongoose = require("mongoose");
const User = require("./User.model");
const Event = require("./Event.model");

const InscriptionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    event: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Inscription = mongoose.model("Inscription", InscriptionSchema);

module.exports = Inscription;
