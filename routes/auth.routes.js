const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
// const secure = require("../middlewares/secure.middleware")
// const passport = require('passport')
// const GOOGLE_SCOPES = [
    // "https://www.googleapis.com/auth/userinfo.profile",
    // "https://www.googleapis.com/auth/userinfo.email"
// ]

//login
router.post("/login", authController.authenticate);

//=======================nodemailer-activarToken=====================
 router.get("/activate/:token",userController.activate);

//get user
router.get("/user/me", authMiddleware.isAuthenticated, userController.get);

//============================google===============================
// router.get('/authenticate/google', passport.authenticate('google-auth', {scope: GOOGLE_SCOPES}));
// router.get('/authenticate/google/cb', userController.doLoginGoogle);


router.post('/googlelogin', authController.googleLogin, )

module.exports = router;
