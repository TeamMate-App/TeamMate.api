const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");


//all users
router.get("/allusers", userController.getAllfromDB);

//edit profile
router.put("/edit", userController.editProfile);

//register
router.post("/register", authController.register);

//delete
router.post("/delete", userController.delete)


module.exports = router;
