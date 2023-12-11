const express = require("express");
const app = express();
const port = 3000;
const rateLimit = require("express-rate-limit");
// database connection with mysql
const connection = require("./database/connection");
const queryRoute = require("./routes/routes");
require("./models/association");
const logger = require("./winston/logger")
// response format
const response = require("./middleware/responseAPI");
app.use(response);

// express-rate-limit
const limiter = rateLimit({
  windowMs: 60 * 1000, // one minute
  max: 10, // max 10 requests
  message: "Too many request(s) from this IP, Please try again later(res-429)",
});

// global rate limiter middlware for all routes
app.use(limiter);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, { body: req.body, query: req.query });
  next();
});
// routes
app.use("/raw", queryRoute);

// server port
app.listen(port, () => {
  console.log(`server running at localhost:/${port}`);
});

