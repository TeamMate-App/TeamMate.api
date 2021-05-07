const createError = require("http-errors");
const Game = require("../models/Game.model");
const Subscriptions = require("../models/Subscriptions.model");
const User = require("../models/User.model");

//create
module.exports.create = (req, res, next) => {
  const user = req.currentUser;
  const gameBody = {
    name: req.body.name,
    address: req.body.address,
    price: req.body.price,
    date: req.body.date,
    location: { coordinates: [req.body.latitude, req.body.longitude] },
    user: req.body.user,
  };

  Game.findOne({ game: gameBody }).then(async (game) => {
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
      gameBody.user = user;
      if (req.file) {
        gameBody.image = req.file.path;
      }

      console.log("REQ.BOOOOODY", gameBody);
      const newGame = await Game.create(gameBody);
      const game = newGame;

      Subscriptions.find({ game: game }).then((inscriptions) => {
        const isEmpty = inscriptions.length < 5;
        if (isEmpty) {
          Subscriptions.create({ user: user, game: game })
            .then((createdinscription) => {
              res.status(201).json(game);
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
