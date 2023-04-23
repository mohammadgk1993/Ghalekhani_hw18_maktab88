const { Op, Sequelize } = require("sequelize");
const { Invoice } = require("../../database/models/invoice");
const { AppError } = require("../../utils/types");


const createInvoice = async (req,res,next) => {
    const invoice = await Invoice.findOne({ where: {transactionCode:req.params.id}})
    if (!!invoice) return next(new AppError("this Invoice is already exists.", 409))
    next()
}

const findInvoice = async (req,res,next) => {
    const invoice = await Invoice.findOne({ where: {transactionCode:req.params.id}})
    if (!invoice) return next(new AppError("this Invoice is not exists.", 409))
    next()
}


module.exports = {
    findInvoice
}