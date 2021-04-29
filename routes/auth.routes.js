const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

//login
router.post("/login", authController.authenticate);

//nodemailer Token Active
router.get("/activate/:token", userController.activate);

//get user
router.get("/user/me", authMiddleware.isAuthenticated, userController.get);

//login google
router.post("/googlelogin", authController.googleLogin);

module.exports = router;
