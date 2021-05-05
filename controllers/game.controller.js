const createError = require("http-errors");
const Game = require("../models/Game.model");
const Subscriptions = require("../models/Subscriptions.model");
const User = require("../models/User.model");

//create
module.exports.create = (req, res, next) => {
  const user = req.currentUser;
  /* req.body.user = req.currentUser */
  
/* 
  console.log("CONSOLE", req.body.user) */

  Game.findOne({ game: req.body }).then(async (game) => {
    if (game) {
      next(
        createError(400, {
          errors: { game: "This game has been created" },
        })
      );
    } else {
      User.findById(req.currentUser).then((user) => {
        if (!user) {
          next(createError(404, "User not found"));
        }
      });
      console.log("REQ.BODY",req.body)
      console.log("Curernt User", user)
      req.body.user = user;
      console.log("REQ.BODY con el user",req.body)


      const newGame = await Game.create(req.body);
      const game = newGame;

      console.log("GAME", newGame);
      console.log("User", user);

      Subscriptions.find({ game: game }).then((inscriptions) => {
        const isEmpty = inscriptions.length < 5;
        if (isEmpty) {
          Subscriptions.create({ user: user, game: game })
            .then((createdinscription) => {
              res.status(201).json(game);
              console.log("Game Creado", game);
              console.log("User Creado", user);

            })
            .catch((err) => next(err));
        }
      });
    }
  });
};

//get all games
module.exports.getAllfromDB = (req, res, next) => {
  Game.find()
    .then((games) => {
      if (!games) {
        next(createError(404, "games not found"));
      } else {
        res.status(200).json(games);
        console.log(games);
      }
    })
    .catch(next);
};

//get
module.exports.get = (req, res, next) => {
  Game.findById(req.params.id).then((game) => {
    if (!game) {
      next(createError(404, "game not found"));
    } else {
      res.json(game);
    }
  });
};

//edit
module.exports.edit = (req, res, next) => {
  Game.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((game) => {
      if (!game) {
        next(createError(404, "game not found"));
      } else {
        game.image = req.file.path;
        return game.save(game).then((game) => res.json(game));
      }
    })
    .catch((error) => next(error));
};

//delete
module.exports.delete = (req, res, next) => {
  Game.findByIdAndRemove({ _id: req.params.id })

    .then(() => {
      res.status(204).json({});
    })
    .catch((err) => next(err));
};
