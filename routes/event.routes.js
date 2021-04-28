const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const authMiddleware = require("../middlewares/auth.middleware");

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

module.exports = router;
