const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const secure = require("../middlewares/secure.middleware")
// user
router.get("/me", userController.get);

//all users
router.get("/allusers",secure.isAuthenticated, userController.getAllfromDB);

//edit profile
router.put("/edit/", authMiddleware.isAuthenticated, userController.editProfile);

//register
router.post("/register",secure.isNotAuthenticated, userController.register);

//delete
router.post("/delete", authMiddleware.isAuthenticated, userController.delete)


module.exports = router;
