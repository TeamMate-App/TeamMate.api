const Inscription = require("../models/Inscription.model");
const {confirmInscription} = require("../config/mailer.config")
const User = require("../models/User.model")


//check is subscribed
module.exports.isSubscribed = (req, res, next) => {
  const game = req.params.gameId;
  const user = req.currentUser;

  Inscription.findOne({ game: game, user: user }).then((inscription) => {
    if (inscription) res.send(true);
    else res.send(null);
  });
};

//subscribe
module.exports.subscribe = (req, res, next) => {
  const game = req.params.GameId;
  const user = req.currentUser;

  Inscription.find({ game: game }).then((inscriptions) => {
    const currentUserInscription = inscriptions.find(
      (inscription) => inscription.userId === user
    );
    if (currentUserInscription)
      res.send("Error, ya estabas apuntado al evento");
    const isEmpty = inscriptions.length < 4;
    if (isEmpty) {
      Inscription.create({ user: user, game: game })
        .then((createdinscription) => {
          confirmInscription()
          res.send("Te has apuntado correctamente al evento!");
        })
        .catch((err) => next(err));
    } else {
      res.send("Error, el evento tiene ya 4 jugadores.");
    }
  });

  Inscription.findOne({
    $and: [
      {
        game: game,
      },
      {
        user: user,
      },
    ],
  })
    .then((inscription) => {
      if (inscription) {
        res.send("¡Error, ya estás inscrito en esta pista!");
      } else {
      }
    })
    .catch((err) => next(err));
};

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
