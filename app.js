/* Requires */

require("dotenv").config();
require("./config/db.config");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const cors = require("cors");
const logger = require("morgan");
const express = require("express");

const app = express();

/* Middlewares */

app.use(express.json());
app.use(logger('dev'));
app.use(cors())

/* Routes */

const routes = require("./config/routes.config");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const courtRoutes = require("./routes/court.routes");
const eventRoutes = require("./routes/event.routes");

app.use("/api", routes);
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api", courtRoutes);


/* Handle Errors */

app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError)
    error = createError(400, error);
  else if (error instanceof mongoose.Error.CastError)
    error = createError(404, 'Resource not found "en el modelo"');
  else if (error instanceof jwt.JsonWebTokenError)
    error = createError(401, error);
  else if (error.message.includes("E11000"))
    error = createError(400, "Already exists");
  else if (!error.status) error = createError(500, error);

  if (error.status >= 500) {
    console.error(error);
  }

  const data = {};
  data.message = error.message;
  data.errors = error.errors
    ? Object.keys(error.errors).reduce(
        (errors, key) => ({
          ...errors,
          [key]: error.errors[key].message || error.errors[key],
        }),
        {}
      )
    : undefined;

  res.status(error.status).json(data);
});

/* Port */

const port = Number(process.env.PORT || 3001);

app.listen(port, () => {
  console.log(`Ready! Listen on port ${port}`);
});
