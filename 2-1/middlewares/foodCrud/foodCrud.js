const { Op, Sequelize } = require("sequelize");
const { Food } = require("../../database/models/food");
const { AppError } = require("../../utils/types");

const createFoodsValidator = async(req,res,next) => {
    const newFood = await Food.findOne({where: { name: req.body.name },});
    if (!!newFood) {
        return next(new AppError("this food is already exists.", 409))
    }

    next()
}

module.exports = {
    createFoodsValidator
}