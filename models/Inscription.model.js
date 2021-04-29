const mongoose = require("mongoose");

const InscriptionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    game: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Game",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Inscription = mongoose.model("Inscription", InscriptionSchema);

module.exports = Inscription;
