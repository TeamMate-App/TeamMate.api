const Subscriptions = require("../models/Subscriptions.model");
const User = require("../models/User.model");

//check is subscribed
module.exports.isSubscribed = (req, res) => {
  const game = req.params.gameId;
  const user = req.currentUser;

  Subscriptions.findOne({ game: game, user: user }).then((inscription) => {
    if (inscription) res.send(true);
    else res.send(null);
  });
};

//subscribe
module.exports.subscribe = (req, res, next) => {
  const game = req.params.GameId;
  const user = req.currentUser;

  Subscriptions.find({ game: game }).then((inscriptions) => {
    if (inscriptions && inscriptions.length == 1) {
      const player1 = inscriptions[0].user;
      console.log("mayor que 1");
      if (player1 == user) {
        res
          .send("Error, ya estabas apuntado al evento")
          .catch((err) => next(err));
      }
    }
    if (inscriptions && inscriptions.length == 2) {
      const player1 = inscriptions[0].user;
      const player2 = inscriptions[1].user;
      console.log("mayor que 1");

      if (player1 == user || player2 == user) {
        res
          .send("Error, ya estabas apuntado al evento")
          .catch((err) => next(err));
      }
    }
    if (inscriptions && inscriptions.length == 3) {
      const player1 = inscriptions[0].user;
      const player2 = inscriptions[1].user;
      const player3 = inscriptions[2].user;
      console.log("mayor que 1");

      if (player1 == user || player2 == user || player3 == user) {
        res
          .send("Error, ya estabas apuntado al evento")
          .catch((err) => next(err));
      }
    }
    if (inscriptions && inscriptions.length == 4) {
      const player1 = inscriptions[0].user;
      const player2 = inscriptions[1].user;
      const player3 = inscriptions[2].user;
      const player4 = inscriptions[3].user;
      console.log("mayor que 3");

      if (
        player1 == user ||
        player2 == user ||
        player3 == user ||
        player4 == user
      ) {
        res
          .send("Error, el evento tiene ya 4 jugadores.")
          .catch((err) => next(err));
      }
    }

    const isEmpty = inscriptions.length < 5;
    if (isEmpty) {
      Subscriptions.create({ user: user, game: game })
        .then((createdinscription) => {
          res.send("Te has apuntado correctamente al evento!");
        })
        .catch((err) => next(err));
    } else {
      res.send("Error, el evento tiene ya 4 jugadores.");
    }
  });
};

//Mostrar users apuntados al evento
module.exports.playersSubscribed = (req, res, next) => {
  const game = req.params.GameId;
  console.log("req.paramsss", req.params.GameId);
  /* const game = req.params.GameId; */
  console.log("game", game);

  Subscriptions.find({ game: game })
    .populate("user")
    .then((players) => {
      console.log("GAME", req.params.GameId);

      console.log("PLAYERS", players);
      if (!players) {
        next(createError(404, "players not found"));
      } else {
        res.json(players);
      }
    })
    .catch(next);
};

//Unsubscribe

module.exports.unsubscribe = (req, res, next) => {
  const game = req.params.id;
  const user = req.currentUser;

  Subscriptions.findOneAndDelete({ game, user })
    .then((result) => {
      res.send("Te has desapuntado correctamente");
    })
    .catch(next);
};
