const createError = require("http-errors");
const User = require("../models/User.model");
const { sendActivationEmail } = require("../config/mailer.config");
const passport = require('passport')

//edit
module.exports.editProfile = (req, res, next) => {
  console.log("req.body", req.body);
  console.log("user", req.currentUser);
  console.log("ha entrado edit");
  User.findOneAndUpdate(
    // { activationToken: req.params.token, active: false },
    // { active: true, activationToken: "active" },
    { _id: req.currentUser },
    req.body,
    {
      new: true,
    }
  )
    .then((user) => {
      console.log(user);
      if (!user) {
        next(createError(404, "User not found"));
      } else {
        return user.save(user).then((user) => res.json({ user }));
      }
    })
    .catch((error) => next(error));
};

//register
module.exports.register = (req, res, next) => {
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
        User.create(req.body).then((user) => {
          console.log("hola", user);
          sendActivationEmail(user.email, user.activationToken);
          return res.status(201).json(user);
        });
      }
    })
    .catch(next);
};

//get all users
module.exports.getAllfromDB = (req, res, next) => {
  User.find()
    .then((users) => {
      if (!users) {
        next(createError(404, "Users not found"));
      } else {
        console.log(users);

        res.status(200).json(users);
      }
    })
    .catch(next);
};

//get current user
module.exports.get = (req, res, next) => {
  User.findById(req.currentUser).then((user) => {
    if (!user) {
      next(createError(404, "User not found"));
    } else {
      res.json(user);
    }
  });
};

//delete
module.exports.delete = (req, res, next) => {
  console.log(req.currentUser);
  console.log(req.body);
  console.log(req.body.id);

  User.findByIdAndDelete(req.currentUser)
    .then(() => {
      res.status(204).json({});
    })
    .catch((err) => next(err));
};
//activation account

module.exports.activate = (req, res, next) => {
  User.findOneAndUpdate(
    { activationToken: req.params.token, active: false },
    { active: true, activationToken: "active" }
  )

    .then(() => {
      res.status(204).json({});
    })
    .catch((err) => next(err));
};


module.exports.doLoginGoogle = (req, res, next) => {
  passport.authenticate('google-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      res.status(400).render('users/login', { error: validations });
    } else {
      req.login(user, loginErr => {
        if (loginErr) next(loginErr)
        else res.redirect('/')
      })
    }
  })(req, res, next)
}

// /* res
  // .status(200)
  // .send({ message: "Todo bien todo correcto y yo que me alegro" }); */
  // activationToken: "active"
