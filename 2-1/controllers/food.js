const { Op, Sequelize, where } = require("sequelize");
const { Student } = require("../database/models/student");
const { AppError } = require("../utils/types");
const { Invoice } = require("../database/models/invoice");
const { Food } = require("../database/models/food");
const { FoodInvoice } = require("../database/models/foodInvoice");

const createFood = async (req,res,next) => {
  try {
    const {name,price} = req.body
    const newFood = await Food.create({name,price})
    res.status(201).json(newFood)
  } catch (error) {
    next(AppError("server Error",500))
  }
}

const getAllFoods = async (req,res,next) => {
  try {
    const foods = await Food.findAll({})
    res.status(201).json(foods)
  } catch (error) {
    next(AppError("server Error",500))
  }
}

const readFood = async (req,res,next) => {
  try {
    const food = await Food.findByPk(req.params.id)
    res.status(201).json(food)
  } catch (error) {
    next(AppError("server Error",500))
  }
}

const deleteFood = async (req,res,next) => {
  try {
    const food = Food.destroy({where:{id:req.params.id}})
    const invoices = await Invoice.findAll({include: { model: Food}})
    invoices.map(item => {
      if (item.Food.length == 0) {
        Invoice.destroy({where:{id:item.id}})
      }
    })

    res.status(201).json(food)
  } catch (error) {
    next(AppError("server Error",500))
  }
}


const updateFood = async (req,res,next) => {
  try {
    const updatedFood = {}
    if (!!req.body.name) updatedFood.name = req.body.name
    if (!!req.body.price) updatedFood.price = req.body.price
    const food = await Food.update(updatedFood,{where:{id:req.params.id}})

    const invoices = await Invoice.findAll({include: { model: Food}})
    invoices.map(item => {
      if (item.Food.length == 0) {
        Invoice.destroy({where:{id:item.id}})
      }
    })
    
    res.status(201).json(food)
  } catch (error) {
     next(AppError("server Error",500))
  }
}

module.exports = {
    createFood,
    getAllFoods,
    readFood,
    updateFood,
    deleteFood
}