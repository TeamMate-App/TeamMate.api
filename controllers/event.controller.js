const createError = require("http-errros");
const Event = require("../models/Event.model");

//edit
module.exports.editEvent = (req, res, next) => {
    console.log("req.body", req.body);
  
    console.log("event", req.currentevent);
  
    Event.findOneAndUpdate({_id: req.currentevent}, req.body, {
      new: true,
    })
      .then((event) => {
        console.log(event)
        if (!event) {
          next(createError(404, "event not found"));
        } else {
          return event.save(event).then((event) => res.json({ event }));
        }
      })
      .catch((error) => next(error));
  };
  
  //Register
  module.exports.register = (req, res, next) => {
    Event.findOne({ email: req.body.email })
      .then(async (event) => {
        if (event) {
          // Error if email is already in the database
          next(
            createError(400, {
              errors: { email: "This email is already in use" },
            })
          );
        } else {
          // event creation
          const event_1 = await event.create(req.body);
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
          console.log(events);
  
          res.status(200).send({ events });
        }
      })
      .catch(next);
  };
  
  //get current event
  module.exports.get = (req, res, next) => {
    Event.findById(req.currentevent).then((event) => {
      if (!event) {
        next(createError(404, "event not found"));
      } else {
        res.json(event);
      }
    });
  };
  
  //delete
  module.exports.delete = (req, res, next) => {
    console.log(req.currentevent)
    console.log(req.body);
    console.log(req.body.id);
  
    Event.findByIdAndDelete(req.currentevent)
    .then(() => {
      res.status(204).json({})
    })
    .catch((err) => next(err))
  }
    /* res
      .status(200)
      .send({ message: "Todo bien todo correcto y yo que me alegro" }); */
