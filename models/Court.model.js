const mongoose = require("mongoose");
const categories = require("../constants/categories");
const User = require("./User.model");

require("./User.model");
require("./Review.model");

const courtSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: "Name of the court is required",
    },
    description: {
      type: String,
      required: "Description is required",
    },
    price: {
      type: Number || String,
      required: "Price is required",
    },
    categories: {
      type: String,
      enum: ["Padel", "Futbol7"],
    },
    place: {
      type: String,
    },
    Surface: {
      type: String,
      enum: ["Cesped Artificial", "Hormigon Poroso", "Resina Sintetica"],
    },
    Wall: {
      type: String,
      enum: ["Hormigón", "Cristal"],
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
      require: "Address is required",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);
/* userSchema.virtual("user", {
  ref: Review.modelName,
  localField: "_id",
  foreignField: "user",
}); */

const Court = mongoose.model("Court", courtSchema);

module.exports = Court;
