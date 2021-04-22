const createError = require("http-errors");
const Event = require("../models/Event.model");

//Create
module.exports.create = (req, res, next) => {
  console.log("HE LLEGAO")
  console.log(req.body)
  Event.findOne({ "event": req.body })
    .then(async (event) => {
      console.log("he llegao dentro1")
      if (event) {
        // Error if email is already in the database
        next(
          createError(400, {
            errors: { event: "This event has been created" },
          })
        );
      } else {
        console.log("he llegao dentro2")
        // event creation
        const event_1 = await Event.create(req.body);
        return res.status(201).json(event_1);
      }
    })
    .catch(next);
};

//edit
module.exports.editEvent = (req, res, next) => {
   /*  console.log("req.body", req.body); */
   console.log("req.params",req.params)
   console.log("req.paramsId",req.params.id)
   console.log("req.body",req.body)
   console.log("req.bodyId",req.body.id)



  
    
    Event.findOneAndUpdate( req.body.id, {
      new: true,
    })
      .then((event) => {
        if (!event) {
          next(createError(404, "event not found"));
        } else {
          return event.save(event).then((event) => res.json({ event }));
        }
        console.log("info que hay en el evento", event)
      })
      .catch((error) => next(error));
  };
  
  
  //get all events
  module.exports.getAllfromDB = (req, res, next) => {
    console.log("he llegao")
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
    console.log("req params", req);
    console.log("he llegao")
    console.log("id")
    Event.findById(req.body.id).then((event) => {
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
