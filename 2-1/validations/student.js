const Joi = require("joi");

const studentValidationSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  studentCode: Joi.string().length(9).required(),
  gender: Joi.string().valid("male","female").required()
});

module.exports = { studentValidationSchema };
