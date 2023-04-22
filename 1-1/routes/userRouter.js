const express = require('express');
const router = express.Router();
const {
    getRegisterPage,
    registerUser,
    getLoginPage,
    loginUser,
    getDashboardPage,
    logout,
    updateUser,
    deleteUser
} = require("../controllers/userControllers");
const {createUserValidator} = require("../middlewares/validators/crudValidators")

router.get("/register", getRegisterPage);
router.post("/register", createUserValidator, registerUser)

router.get("/login", getLoginPage);
router.post("/login", loginUser);

router.get("/dashboard", getDashboardPage);

router.get("/logout", logout);

router.patch("/", updateUser)

router.delete("/", deleteUser)

module.exports = router;