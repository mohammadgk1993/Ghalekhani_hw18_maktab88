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


router.post("/", createFoodValidator, requestHandler(createFood))

router.get("/", requestHandler(getAllFoods))

router.get("/:name", findFoodValidator, requestHandler(readFood))

router.patch("/:name", findFoodValidator, requestHandler(updateFood))

router.delete("/:name", findFoodValidator, requestHandler(deleteFood))

module.exports = router;