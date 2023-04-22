const express = require("express");
const studentRouter = require("./student");
const invoiceRouter = require("./invoice")
const foodRouter = require("./food")
const router = express.Router();

router.get("/ping", function (req, res, next) {
  res.send({ message: "pong" });
});

router.use("/students", studentRouter);

router.use("/invoices", invoiceRouter)

router.use("/foods", foodRouter)

module.exports = router;
