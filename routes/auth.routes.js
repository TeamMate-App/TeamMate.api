const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const secure = require("../middlewares/secure.middleware")

//login
router.post("/login",secure.isAuthenticated, authController.authenticate);

//=======================nodemailer-activarToken=====================
 router.get("/user/register/activate/:token",userController.activate);

//get user
router.get("/user/me",secure.isAuthenticated, authMiddleware.isAuthenticated, userController.get);

module.exports = router;
