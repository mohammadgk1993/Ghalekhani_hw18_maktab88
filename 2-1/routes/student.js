const express = require("express");
const { requestHandler } = require("../services/request.handler");
const { validator } = require("../services/validator");
const { paginationSchema } = require("../validations/global");
const router = express.Router();
const { studentValidationSchema } = require("../validations/student");
const {
  createStudentsValidator,
  findStudent
} = require("../middlewares/studentsCrud/studentCrud")
const {
  addStudentController,
  getAllStudents,
  readStudentController,
  deleteStudentController,
  updateStudentController
} = require("../controllers/student");


router.get(
  "/",
  validator(paginationSchema, "query"),
  requestHandler(getAllStudents)
);

router.post(
  "/",
  validator(studentValidationSchema, "body"),
  createStudentsValidator,
  requestHandler(addStudentController)
);

router.get("/:id", findStudent,requestHandler(readStudentController))

router.delete("/:id", findStudent,requestHandler(deleteStudentController))

router.patch("/:id", findStudent,requestHandler(updateStudentController))

module.exports = router;