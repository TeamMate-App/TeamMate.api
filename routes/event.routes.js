const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const inscription = require("../controllers/inscription.controller.js");

//all events
router.get("/", eventController.getAllfromDB);

//create
router.post("/create", eventController.create);

//get
router.get("/:id", eventController.get);

//delete
router.post("/delete/:id", eventController.delete);

//edit event
router.put("/edit/:id", authMiddleware.isAuthenticated, eventController.edit);

router.get("/join/:matchId", authMiddleware.isAuthenticated, inscription.isSubscribed);

//apuntarse a un evento
router.post(
  "/join/:matchId",
  authMiddleware.isAuthenticated,
  inscription.subscribe
);

//desapuntarse de un evento
router.delete("/join/:matchId", authMiddleware.isAuthenticated, inscription.unsubscribe);

module.exports = router;
