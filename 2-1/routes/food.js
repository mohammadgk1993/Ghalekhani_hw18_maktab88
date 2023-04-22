const express = require("express");
const router = express.Router();
const { requestHandler } = require("../services/request.handler");
const { 
    createFood,
    getAllFoods,
    readFood,
    updateFood,
    deleteFood
 } = require("../controllers/food");
const {
    createFoodValidator,
    findFoodValidator
} = require("../middlewares/foodCrud/foodCrud")


router.post("/", createFoodValidator,createFood)

router.get("/", getAllFoods)

router.get("/:id", findFoodValidator, readFood)

router.patch("/:id", findFoodValidator, updateFood)

router.delete("/:id", findFoodValidator, deleteFood)

module.exports = router;