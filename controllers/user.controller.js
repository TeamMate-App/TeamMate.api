const createError = require("http-errors");
const User = require("../models/User.model");

//edit
module.exports.editProfile = (req, res, next) => {
  console.log("req.body", req.body);

  console.log("user", req.currentUser);

  User.findOneAndUpdate({ _id: req.currentUser }, req.body, {
    new: true,
  })
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
        const user_1 = User.create(req.body);
        return res.status(201).json(user_1);
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

        res.status(200).send({ users });
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

