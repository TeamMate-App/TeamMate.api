const createError = require("http-errors");
const Event = require("../models/Event.model");

//create
module.exports.create = (req, res, next) => {
  console.log(req.body);
  Event.findOne({ event: req.body })
    .then(async (event) => {
      if (event) {
        next(
          createError(400, {
            errors: { event: "This event has been created" },
          })
        );
      } else {
        const event_1 = await Event.create(req.body);
        return res.status(201).json(event_1);
      }
    })
    .catch(next);
};

//get all events
module.exports.getAllfromDB = (req, res, next) => {
  Event.find()
    .then((events) => {
      if (!events) {
        next(createError(404, "events not found"));
      } else {
        res.status(200).json( events );
      }
    })
    .catch(next);
};

/* //get current event NOT WORK
  module.exports.get = (req, res, next) => {
    console.log("req params", req);
    console.log("he llegao");
    console.log("id");
    Event.findById(req.body.id).then((event) => {
      if (!event) {
        next(createError(404, "event not found"));
      } else {
        res.json(event);
      }
    });
  }; */

//edit
module.exports.edit = (req, res, next) => {
  Event.findOneAndUpdate({ _id: req.body.id }, req.body, {
    new: true,
  })
    .then((event) => {
      if (!event) {
        next(createError(404, "event not found"));
      } else {
        return event.save(event).then((event) => res.json( event ));
      }
    })
    .catch((error) => next(error));
};

//delete
module.exports.delete = (req, res, next) => {
  Event.findByIdAndDelete({ _id: req.body.id })
    .then(() => {
      res.status(204).json({});
    })
    .catch((err) => next(err));
};
