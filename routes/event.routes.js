const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller")
const authMiddleware = require("../middlewares/auth.middleware")


//all events
router.get("/allevents", eventController.getAllfromDB);

//create
router.post("/create", eventController.create); 

/* router.get("/get", eventController.get); */

//edit event
router.put("/edit", /* authMiddleware.isAuthenticated, */ eventController.edit);

//delete
router.post("/delete", /* authMiddleware.isAuthenticated, */ eventController.delete)


module.exports = router;