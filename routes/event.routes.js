const express = require("express");
const router = express.Router();


//all events
router.get("/allevents", eventController.getAllfromDB);

//edit event
router.put("/edit/event", authMiddleware.isAuthenticated, eventController.editEvent);

//create
router.post("/register/event/create", eventController.create);

//delete
router.post("/deleteEvent", authMiddleware.isAuthenticated, userController.deleteEvent)


module.exports = router;