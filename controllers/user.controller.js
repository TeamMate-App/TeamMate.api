const createError = require("http-errors");
const User = require("../models/User.model");

//edit
module.exports.editProfile = (req, res, next) => {
  console.log("req.body", req.body);
  console.log("req.body", req.body.id);

  console.log("user", req.currentUser);

  User.findByIdAndUpdate(req.body.id, req.body, {
    safe: true,
    upsert: true,
    new: true,
  })
    .then((user) => {
      if (!user) {
        next(createError(404, "User not found"));
      } else {
        return user.save(user).then((user) => res.json({ user }));
      }
    })
    .catch((error) => next(error));
};

//all users
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

//get user
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
  console.log(req.body.id)
  User.findByIdAndDelete(req.body.id)
      .then(() => {
        res.status(204).json({})
      })
      .catch((err) => next(err))
  };
  
  /* res
    .status(200)
    .send({ message: "Todo bien todo correcto y yo que me alegro" }); */