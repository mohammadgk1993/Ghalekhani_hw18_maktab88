const { Op, Sequelize } = require("sequelize");
const { Student } = require("../../database/models/student");
const { AppError } = require("../../utils/types");

const createStudentsValidator = async(req,res,next) => {
    const newStudent = await Student.findOne({where: { studentCode: req.body.studentCode },});
    if (!!newStudent) {
        return next(new AppError("this studentCode is already exists.", 409))
    }

    next()
}

module.exports = {
    createStudentsValidator
}