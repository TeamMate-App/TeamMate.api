const express = require("express");
const router = express.Router();
const GameController = require("../controllers/game.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const inscription = require("../controllers/subscription.controller.js");
const upload = require ("../config/storage.config")

//all events
router.get("/", authMiddleware.isAuthenticated, GameController.getAllfromDB);

//create
router.post("/create",upload.single("image"), GameController.create);

//get
router.get("/:id", authMiddleware.isAuthenticated, GameController.get);

//delete
router.post(
  "/delete/:id",
  authMiddleware.isAuthenticated,
  GameController.delete
);

//edit event
router.put("/edit/:id", authMiddleware.isAuthenticated,upload.single("image"), GameController.edit);

router.get(
  "/join/:GameId",
  authMiddleware.isAuthenticated,
  inscription.isSubscribed
);

//subscribe event
router.post(
  "/join/:GameId",
  authMiddleware.isAuthenticated,
  inscription.subscribe
);
/* 
//unsubscribe
router.delete(
  "/join/:matchId",
  authMiddleware.isAuthenticated,
  inscription.unsubscribe
); */

module.exports = router;
