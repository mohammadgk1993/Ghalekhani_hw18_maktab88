const { Op, Sequelize, where } = require("sequelize");
const { Student } = require("../database/models/student");
const { AppError } = require("../utils/types");
const { Invoice } = require("../database/models/invoice");
const { Food } = require("../database/models/food");
const { FoodInvoice } = require("../database/models/foodInvoice");


const createInvoice = async (req,res,next) => {
  try {
    const invoice = await Invoice.create({transactionCode: req.body.transactionCode,});
    const student = await Student.findOne({studentCode:req.body.studentCode});
    if (student) await student.addInvoice(invoice);

    for (let foodName of req.body.foods) {
      const food = await Food.findOne({where:{name:foodName}})
      await FoodInvoice.create({InvoiceId:invoice.id,FoodId:food.id})
    }
    res.status(201).json(invoice)
  } catch (error) {
    next(AppError("server Error",500))
  }
}

const readAllInvoices = async (req,res,next) => {
  try {
    const invoices = await Invoice.findAll({include: { model: Food}})
    res.status(201).json(invoices)
  } catch (error) {
    next(AppError("server Error",500))
  }
}

const readInvoice = async (req,res,next) => {
  try {
    const invoice = await Invoice.findOne({ where: {transactionCode:req.params.id}, include: { model: Food}})

    const foodInvoice = await FoodInvoice.findAll({where:{InvoiceId:invoice.id}})
    // const foodInvoice = await FoodInvoice.findOne({where:{InvoiceId:invoice.id}})
    res.status(201).json(invoice)
  } catch (error) {
    next(AppError("server Error",500))
  }
}


const deleteInvoice = async (req,res,next) => {
  try {
    const invoice = await Invoice.destroy({ where: {transactionCode:req.params.id}})
    res.status(201).json(invoice)
  } catch (error) {
    next(AppError("server Error",500))
  }
}


const updateInvoice = async (req,res,next) => {
  try {
    let studentCode
    let foods = []

    if (!!req.body.foods && req.body.foods.length != 0) foods = req.body.foods

    const invoice = await Invoice.findOne({ where: {transactionCode:req.params.id}})
    const foodInvoice = await FoodInvoice.destroy({where:{InvoiceId:invoice.id}})
    
    if (!!req.body.studentCode) {
      studentCode = req.body.studentCode
      const newStudent = await Student.findOne({where:{studentCode:studentCode}})
      await Invoice.update({StudentId:newStudent.id},{ where: {transactionCode:req.params.id}})
    }

    for (let foodName of foods) {
      const food = await Food.findOne({where:{name:foodName}})
      await FoodInvoice.create({InvoiceId:invoice.id,FoodId:food.id})
    }
    
    res.status(201).json(invoice)
    
  } catch (error) {
    next(AppError("server Error",500))
  }
}


module.exports = {
  readAllInvoices,
    createInvoice,
    readInvoice,
    deleteInvoice,
    updateInvoice,
}