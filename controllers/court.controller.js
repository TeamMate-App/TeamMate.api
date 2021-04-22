const createError = require("http-errors");
const Court = require("../models/Courts.model");

//=======================PRUEBA

module.exports.getAllfromDB = (req, res, next) => {
  Court.find()
    .then((courts) => {
      if (!courts) {
        next(createError(404, "Courts not found"));
      } else {
        console.log(courts);

        res.status(200).send({ courts });
      }
    })
    .catch(next);
};
//===========
