const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../config/storage.config")

// user
router.get("/me", userController.get);

//all users
router.get("/allusers", userController.getAllfromDB);

//edit profile
router.put("/edit/", authMiddleware.isAuthenticated,upload.single("image"), userController.editProfile);

//register
router.post("/register", userController.register);

//delete
router.post("/delete", authMiddleware.isAuthenticated, userController.delete);

module.exports = router;
