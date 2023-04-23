const { Op, Sequelize } = require("sequelize");
const { Student } = require("../database/models/student");
const { AppError } = require("../utils/types");
const { Invoice } = require("../database/models/invoice");
const { Food } = require("../database/models/food");

const getAllStudents = async (req, res, next) => { 
  try {
    const { page = 1, limit = 10, search = undefined } = req.query;
    const query = {
      offset: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
      include: { model: Invoice,include:[Food]},
      attributes: [
        ["id", "uid"],
        "firstName",
        "lastName",
        "gender",
        "studentCode",
        "createdAt",
        "updatedAt",
      ],
    };
    
    if (!!search) {
      query.where = {
        [Op.or]: [
          { firstName: { [Op.like]: `%${search}%` } },
          { lastName: { [Op.like]: `%${search}%` } },
        ],
      };
    }
    const students = await Student.findAndCountAll(query);
    res.status(201).json(students);
  } catch (error) {
    next(AppError("server Error",500))
  }
};

const addStudentController = async (req, res, next) => {
  try {
    const {firstName,lastName,studentCode,gender} = req.body
    const newStudent = await Student.create({firstName,lastName,studentCode,gender});
    res.status(201).json(newStudent)
    // const newInvoice = await Invoice.create({
    //   transactionCode: "123",
    //   reserveDate: new Date(),
    // });
    // newStudent.addInvoice(newInvoice);
  } catch (error) {
    next(AppError("server Error",500))
  }  
};

const readStudentController = async (req, res, next) => {
  try {
    const student = await student.findOne({ where: { studentCode: req.params.id },include: { model: Invoice,include:[Food]}})
    res.status(201).json(student)
  } catch (error) {
    next(AppError("server Error",500))
  }

  // Student.findOne({ where: { studentCode: req.params.id },include: { model: Invoice,include:[Food]}})
  // .then(data => {
  //   if (!!data) res.status(201).json(data)
  //   else return next(new AppError("not exists.", 409))
  // })
}

const deleteStudentController = async (req, res, next) => {
  try {
    const deletedStudent = await Student.destroy({ where: { studentCode: req.params.id },})
    es.status(201).json(`${data} student with ${req.params.id} national code deleted`)
  } catch (error) {
    next(AppError("server Error",500))
  }

  // Student.destroy({ where: { studentCode: req.params.id },})
  // .then(data => {
  //   if (!!data) res.status(201).json(`${data} student with ${req.params.id} national code deleted`)
  //   else return next(new AppError("not exists.", 409))
  // })
}

const updateStudentController = async(req, res, next) => {
  try {
    const updatedStudent = await Student.update(req.body , { where: { studentCode: req.params.id },})
    res.status(201).json(updatedStudent)
  } catch (error) {
    next(AppError("server Error",500))
  }
  // Student.update(req.body , { where: { studentCode: req.params.id },})
  // .then(data => {
  //   if (!!data) res.status(201).json(data)
  //   else return next(new AppError("not exists.", 409))
  // })
}


module.exports = { 
  addStudentController,
  getAllStudents,
  readStudentController,
  deleteStudentController,
  updateStudentController
 };
