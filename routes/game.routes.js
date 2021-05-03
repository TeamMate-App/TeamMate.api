const express = require("express");
const router = express.Router();
const GameController = require("../controllers/game.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const Subscription = require("../controllers/subscription.controller.js");
const User = require("../models/User.model");

//all events
router.get("/", authMiddleware.isAuthenticated, GameController.getAllfromDB);

//players suscribed
router.get("/join/:GameId/allPlayers", Subscription.playersSubscribed);

//subscribe event
router.post(
  "/join/:GameId",
  authMiddleware.isAuthenticated,
  Subscription.subscribe
);

//join game
router.get(
  "/join/:GameId",
  authMiddleware.isAuthenticated,
  Subscription.isSubscribed
);

//create
router.post("/create", GameController.create);

//get
router.get("/:id", authMiddleware.isAuthenticated, GameController.get);

//delete
router.post(
  "/delete/:id",
  authMiddleware.isAuthenticated,
  GameController.delete
);

//edit event
router.put("/edit/:id", authMiddleware.isAuthenticated, GameController.edit);

/* 
    
//unsubscribe
router.delete(
  "/join/:matchId",
  authMiddleware.isAuthenticated,
  Subscription.unsubscribe
); */

module.exports = router;
