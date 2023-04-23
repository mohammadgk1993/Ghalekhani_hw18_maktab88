const { Op, Sequelize } = require("sequelize");
const { Student } = require("../database/models/student");
const { AppError } = require("../utils/types");
const { Invoice } = require("../database/models/invoice");
const { Food } = require("../database/models/food");

const getAllStudents = async (req, res, next) => { 
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
};

const addStudentController = async (req, res, next) => {
    const {firstName,lastName,studentCode,gender} = req.body
    const newStudent = await Student.create({firstName,lastName,studentCode,gender});
    res.status(201).json(newStudent)
    // const newInvoice = await Invoice.create({
    //   transactionCode: "123",
    //   reserveDate: new Date(),
    // });
    // newStudent.addInvoice(newInvoice);  
};

const readStudentController = async (req, res, next) => {
    const student = await Student.findOne({ where: { studentCode: req.params.id },include: { model: Invoice,include:[Food]}})
    res.status(201).json(student)

  // Student.findOne({ where: { studentCode: req.params.id },include: { model: Invoice,include:[Food]}})
  // .then(data => {
  //   if (!!data) res.status(201).json(data)
  //   else return next(new AppError("not exists.", 409))
  // })
}

const deleteStudentController = async (req, res, next) => {
    const deletedStudent = await Student.destroy({ where: { studentCode: req.params.id },})
    res.status(201).json(deletedStudent)

  // Student.destroy({ where: { studentCode: req.params.id },})
  // .then(data => {
  //   if (!!data) res.status(201).json(`${data} student with ${req.params.id} national code deleted`)
  //   else return next(new AppError("not exists.", 409))
  // })
}

const updateStudentController = async(req, res, next) => {
    const updatedStudent = await Student.update(req.body , { where: { studentCode: req.params.id },})
    res.status(201).json(updatedStudent)
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
