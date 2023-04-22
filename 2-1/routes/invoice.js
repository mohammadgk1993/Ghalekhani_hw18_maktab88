const express = require("express");
const { requestHandler } = require("../services/request.handler");
const {
    createInvoice,
    readInvoice,
    deleteInvoice,
    updateInvoice,
    readAllInvoices
} = require("../controllers/invoice");
const router = express.Router();

router.get("/", readAllInvoices)

router.post("/", createInvoice)

router.get("/:id", readInvoice)

router.delete("/:id", deleteInvoice)

router.patch("/:id", updateInvoice)

module.exports = router