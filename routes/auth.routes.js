const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

//login
router.post("/login", authController.authenticate);

//get user
router.get("/user/me", authMiddleware.isAuthenticated, userController.get);

module.exports = router;
