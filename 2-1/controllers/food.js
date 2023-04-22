const { Op, Sequelize, where } = require("sequelize");
const { Student } = require("../database/models/student");
const { AppError } = require("../utils/types");
const { Invoice } = require("../database/models/invoice");
const { Food } = require("../database/models/food");
const { FoodInvoice } = require("../database/models/foodInvoice");

const createFood = async (req,res,next) => {
  const {name,price} = req.body

  const newFood = await Food.create({name,price})

  res.status(201).json(newFood)
}

const getAllFoods = async (req,res,next) => {
  const foods = await Food.findAll({})

  res.status(201).json(foods)
}

const readFood = async (req,res,next) => {
  const food = await Food.findByPk(req.params.id)

  res.status(201).json(food)
}

const deleteFood = async (req,res,next) => {
  const food = Food.destroy({where:{id:req.params.id}})
  // const invoices = Invoice.findAll({include: { model: Food}})

  // for (let invoice in invoices) {
  //   if (invoice.Food.length == 0) {
  //     await Invoice.destroy({where:{id:invoice.id}})
  //     res.json(invoice.id)
  //   }
  // }

  res.status(201).json(food)
}

const updateFood = async (req,res,next) => {
  const updatedFood = {}

  if (!!req.body.name) updatedFood.name = req.body.name
  if (!!req.body.price) updatedFood.price = req.body.price

  const food = await Food.update(updatedFood,{where:{id:req.params.id}})

  res.status(201).json(food)
}

module.exports = {
    createFood,
    getAllFoods,
    readFood,
    updateFood,
    deleteFood
}