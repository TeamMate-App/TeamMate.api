const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const inscription = require("../controllers/inscription.controller.js");

//all events
router.get("/",authMiddleware.isAuthenticated, eventController.getAllfromDB);

//create
router.post("/create",authMiddleware.isAuthenticated, eventController.create);

//get
router.get("/:id",authMiddleware.isAuthenticated, eventController.get);

//delete
router.post("/delete/:id",authMiddleware.isAuthenticated, eventController.delete);

//edit event
router.put("/edit/:id",authMiddleware.isAuthenticated, authMiddleware.isAuthenticated, eventController.edit);

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
