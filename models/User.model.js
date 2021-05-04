const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Email type condition
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//times password hash
const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
      required: "Email is required",
      match: [EMAIL_PATTERN, "Email is not valid"],
    },
    password: {
      type: String,
      required: "Password is required",
      minLength: [8, "Password must have 8 characters or more"],
    },
    name: {
      type: String,
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

    description:{
      type: String,
    },

    address: {
      type: String,
    },

    active: {
      type: Boolean,
      default: false,
    },
    social: {
      google: String,
    },

    activationToken: {
      type: String,
      default: () => {
        return (
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
        );
      },
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

//bcrypt hash password
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, SALT_WORK_FACTOR).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

//bcrypt check password
userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

//User - Events
userSchema.virtual("Game", {
  ref: "Game",
  localField: "_id",
  foreignField: "user",
});

//User - Inscription
userSchema.virtual("Inscription", {
  ref: "Inscription",
  localField: "_id",
  foreignField: "user",
});

//export
const User = mongoose.model("User", userSchema);
module.exports = User;
