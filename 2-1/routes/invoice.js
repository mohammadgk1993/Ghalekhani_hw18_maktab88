const express = require("express");
const { requestHandler } = require("../services/request.handler");
const {
    createInvoice,
    readInvoice,
    deleteInvoice,
    updateInvoice,
    readAllInvoices,
} = require("../controllers/invoice");
// const { invoiceValidationSchema } = require("../validations/invoice");
const {
    createInvoiceValidator,
    findInvoiceValidator
} = require("../middlewares/invoiceCrud/invoiceCrud")


const router = express.Router();

router.get("/", requestHandler(readAllInvoices))

router.post("/", createInvoiceValidator, requestHandler(createInvoice))

router.get("/:id", findInvoiceValidator, requestHandler(readInvoice))

router.delete("/:id", findInvoiceValidator, requestHandler(deleteInvoice))

router.patch("/:id", findInvoiceValidator, requestHandler(updateInvoice))


module.exports = router