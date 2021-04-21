const express = require("express");
const router = express.Router();

//Pruebas Postman
router.get("/pistas", (req, res) => {
  res.status(200).send({ pistas: [] });
});

router.post("/pistas", (req, res) => {
  console.log("delete");
  console.log(req.currentUser.id)
  res
    .status(200)
    .send({ message: "Todo bien todo correcto y yo que me alegro" });
});

module.exports = router;
