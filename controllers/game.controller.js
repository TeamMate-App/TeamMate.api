const createError = require("http-errors");
const Game = require("../models/Game.model");

//create
module.exports.create = (req, res, next) => {
  Game.findOne({ game: req.body })
    .then(async (game) => {
      if (game) {
        next(
          createError(400, {
            errors: { game: "This game has been created" },
          })
        );
      } else {
        const game_1 = await Game.create(req.body);
        return res.status(201).json(game_1);
      }
    })
    .catch(next);
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
        game.image = req.file.path 
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
