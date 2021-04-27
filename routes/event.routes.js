const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const authMiddleware = require("../middlewares/auth.middleware");

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

module.exports = router;
