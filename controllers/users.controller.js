const createError = require("http-errors");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

//=======================CREATE

module.exports.create = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        // Error if email is already in the database
        next(
          createError(400, {
            errors: { email: "This email is already in use" },
          })
        );
      } else {
        // User creation
        return User.create(req.body).then((user) => res.status(201).json(user));
      }
    })
    .catch(next);
};
//===========

//=======================PRUEBA

module.exports.getAllfromDB = (req, res, next) => {
  User.find()
    .then((users) => {
      if (!users) {
        next(createError(404, "Users not found"));
      } else {
        console.log(users);

        res.status(200).send({ users });
      }
    })
    .catch(next);
};
//===========

//=======================Get con el usuario que está en sesion (currentUser)

module.exports.get = (req, res, next) => {
  console.log("he llegao al ppio");

  User.findById(req.currentUser).then((user) => {
    if (!user) {
      console.log("he llegao");
      next(createError(404, "User not found"));
    } else {
      res.json(user);
    }
  });
};
//===========

//=======================JWT-LOGIN

module.exports.authenticate = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      console.log("NO HAY USER");
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
                expiresIn: "10s",
              }
            ),
          });
        }
      });
    }
  });
};

//=======================
