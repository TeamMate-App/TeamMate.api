const createError = require("http-errors");
const Inscription = require("../models/Inscription.model");

//=======================subscribe

module.exports.isSubscribed = (req, res, next) => {
  const event = req.params.matchId;
  const user = req.currentUser;

  Inscription.findOne({ event: event, user: user }).then((inscription) => {
    if (inscription) res.send(true);
    else res.send(null);
  });
};

module.exports.subscribe = (req, res, next) => {
  const event = req.params.matchId;
  const user = req.currentUser;

  Inscription.find({ event: event }).then((inscriptions) => {
    const currentUserInscription = inscriptions.find(
      (inscription) => inscription.userId === user
    );
    if (currentUserInscription)
      res.send("Error, ya estabas apuntado al evento");
    const isEmpty = inscriptions.length < 4;
    if (isEmpty) {
      Inscription.create({ user: user, event: event })
        .then((createdinscription) => {
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
        event: event,
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

//===========

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
};
