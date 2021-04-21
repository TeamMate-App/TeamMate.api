const express = require("express");
const router = express.Router();
const courtController = require("../controllers/court.controller");

// Courts routes
router.get("/allcourts", courtController.getAllfromDB);

module.exports = router;