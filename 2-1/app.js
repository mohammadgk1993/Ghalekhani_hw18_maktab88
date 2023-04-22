const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { errorHandler } = require("./services/error.handler");
require("dotenv").config();
require("./database/load");

const apiRouter = require("./routes/index");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", apiRouter);
app.use(errorHandler);

module.exports = app;
