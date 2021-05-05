const createError = require("http-errors");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "346173711034-9v4f1b4hstrbjagq5ugdlf7nd66uplfh.apps.googleusercontent.com"
);

//JsonWebToken Login
module.exports.authenticate = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email, active: true }).then((user) => {
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

//login with Google
module.exports.googleLogin = (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "346173711034-9v4f1b4hstrbjagq5ugdlf7nd66uplfh.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            createError(404, {
              errors: { email: "Something went wrong..." },
            });
          } else {
            if (user) {
              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
              });
              const { _id, name, email, active } = user;
              res.json({
                token,
                user: { _id, name, email: true },
              });
            } else {
              let password = email + process.env.JWT_SECRET;
              let newUser = new User({
                name,
                email,
                password,
                active: true,
                activationToken: "active",
              });
              newUser.save((err, data) => {
                if (err) {
                  createError(404, {
                    errors: { email: "Something went wrong..." },
                  });
                }
                const token = jwt.sign(
                  { _id: data._id },
                  process.env.JWT_SECRET,
                  { expiresIn: "1d" }
                );
                const { _id, name, email } = new User();
                res.json({
                  token,
                  user: { _id, name, email },
                });
              });
            }
          }
        });
      }
    });
  console.log();
};
