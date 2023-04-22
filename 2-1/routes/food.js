const express = require("express");
const { requestHandler } = require("../services/request.handler");
// const { studentValidationSchema } = require("../validations/student");
// const { validator } = require("../services/validator");
// const { paginationSchema } = require("../validations/global");
const { 
    createFood,
    getAllFoods,
    readFood,
    updateFood,
    deleteFood
 } = require("../controllers/food");
const router = express.Router();
const {createFoodsValidator} = require("../middlewares/foodCrud/foodCrud")


router.post("/", createFoodsValidator,createFood)

router.get("/", getAllFoods)

router.get("/:id", readFood)

router.patch("/:id", updateFood)

router.delete("/:id", deleteFood)

module.exports = router;