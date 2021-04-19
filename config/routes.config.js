const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Users routes
router.post("/users", usersController.create);
router.get("/users/me", authMiddleware.isAuthenticated, usersController.get);

router.get("/allusers", usersController.getAllfromDB);

//Auth routes
router.post("/login", usersController.authenticate);

//Pruebas Postman
router.get("/pistas", (req, res) => {
  res
    .status(200)
    .send({ pistas: [] });
});

router.post("/pistas", (req, res) => {
  console.log(req.body);
  res
    .status(200)
    .send({ message: "Todo bien todo correcto y yo que me alegro" });
});

module.exports = router;
