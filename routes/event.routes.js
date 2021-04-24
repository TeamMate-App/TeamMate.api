const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller")
const authMiddleware = require("../middlewares/auth.middleware")


//all events
router.get("/", eventController.getAllfromDB);

//create
router.post("/", eventController.create); 

/* router.get("/get", eventController.get); */

//edit event
router.put("/edit", /* authMiddleware.isAuthenticated, */ eventController.edit);

//delete
router.post("/delete", /* authMiddleware.isAuthenticated, */ eventController.delete)


module.exports = router;