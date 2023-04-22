const express = require("express");
const { requestHandler } = require("../services/request.handler");
const {
  addStudentController,
  getAllStudents,
  readStudentController,
  deleteStudentController,
  updateStudentController
} = require("../controllers/student");
const { studentValidationSchema } = require("../validations/student");
const { validator } = require("../services/validator");
const {createStudentsValidator} = require("../middlewares/studentsCrud/createStudents")
const { paginationSchema } = require("../validations/global");
const router = express.Router();


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

router.get("/:id", requestHandler(readStudentController))

router.delete("/:id", requestHandler(deleteStudentController))

router.patch("/:id", requestHandler(updateStudentController))

module.exports = router;