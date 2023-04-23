const { Op, Sequelize } = require("sequelize");
const { Invoice } = require("../../database/models/invoice");
const { AppError } = require("../../utils/types");


const createInvoiceValidator = async (req,res,next) => {
    if (!req.body.transactionCode || req.body.transactionCode.length != 12) {
        return next(new AppError("invalid transactionCode.", 409))
    }
    const invoice = await Invoice.findOne({ where: {transactionCode:req.body.transactionCode}})
    if (!!invoice) return next(new AppError("this Invoice is already exists.", 409))
    next()
}

const findInvoiceValidator = async (req,res,next) => {
    const invoice = await Invoice.findOne({ where: {transactionCode:req.params.id}})
    if (!invoice) return next(new AppError("this Invoice is not exists.", 409))
    next()
}


module.exports = {
    createInvoiceValidator,
    findInvoiceValidator
}