const createError = require("http-errors");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");



//JsonWebToken Login
module.exports.authenticate = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      // Error if no user
      next(
        createError(404, {
          errors: { email: "Email or password is incorrect" },
        })
      );
    } else {
      return user.checkPassword(password).then((match) => {
        if (!match) {
          //Error if no password
          next(
            createError(404, {
              errors: { email: "Email or password is incorrect" },
            })
          );
        } else {
          // JWT generation - only id is passed
          res.json({
            access_token: jwt.sign(
              { id: user._id },
              process.env.JWT_SECRET || "changeme",
              {
                expiresIn: "1d",
              }
            ),
          });
        }
      });
    }
  });
};
