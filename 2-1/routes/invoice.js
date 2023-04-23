const express = require("express");
const { requestHandler } = require("../services/request.handler");
const {
    createInvoice,
    readInvoice,
    deleteInvoice,
    updateInvoice,
    readAllInvoices,
} = require("../controllers/invoice");
const { invoiceValidationSchema } = require("../validations/invoice");
const {
    createInvoice,
    findInvoice
} = require("../middlewares/invoiceCrud/invoiceCrud")


const router = express.Router();

router.get("/", readAllInvoices)

router.post("/", createInvoice, invoiceValidationSchema, createInvoice)

router.get("/:id", findInvoice, readInvoice)

router.delete("/:id", findInvoice, deleteInvoice)

router.patch("/:id", findInvoice, updateInvoice)


module.exports = router