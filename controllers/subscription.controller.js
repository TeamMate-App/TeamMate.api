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
    const currentUserInscription = inscriptions.find(
      ({ user: user }) => user === user
    );
    if (currentUserInscription) {
      res
        .send("Error, ya estabas apuntado al evento")
        .catch((err) => next(err));
    }

    const isEmpty = inscriptions.length < 4;
    if (isEmpty) {
      Subscriptions.create({ user: user, game: game })
        .then((createdinscription) => {
          res.send("Te has apuntado correctamente al evento!");
        })
        .catch((err) => next(err));
    } else {
/*       console.log(inscriptions[0].user);
 */
      res.send("Error, el evento tiene ya 4 jugadores.");
    }
  });
}


//Mostrar users apuntados al evento

module.exports.playersSubscribed = (req, res, next) => {
  const game = req.params.gameId;
  Subscriptions.find(game)

    .populate("user")
    .then((players) => {
      if (!players) {
        next(createError(404, "players not found"));
      } else {
        console.log(players);
        res.json(players);
      }
    })
    .catch(next);
};

/* module.exports.playersSubscribed = (req, res, next) => {
  const game = req.params.gameId;
  Subscriptions.find(game).then((users) => {
    if (!users) {
      next(createError(404, "Any player suscribed"));
    } else {
      res.status(200).json(users);
      console.log(req);

      User.find()
        .populate("User")
        .then((Players) => {
          if (!Players) {
            next(createError(404, "Players not found"));
          } else {
            console.log("req");
            res.status(200).json(Players);
          }
        })
        .catch(next);
    }
  });
}; */
/* //Unsubscribe
module.exports.unsubscribe = (req, res, next) => {
  const event = req.params.matchId;
  const user = req.currentUser;
  Inscription.findOne({
    $and: [
      {
        event: event,
      },
      {
        user: user,
      },
    ],
  }).then((inscription) => {
    if (inscription) {
      Inscription.deleteOne({ user: user, event: event })
        .then((data) => res.send("Te has desapuntado correctamente del evento"))
        .catch((error) => next(error));
    } else {
      res.send("¡Error, no estás inscrito en esta pista");
    }
  });
}; */