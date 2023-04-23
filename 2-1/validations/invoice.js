const Joi = require("joi");

const invoiceValidationSchema = Joi.object({
  transactionCode: Joi.string().min(12).max(12).required(),
});

module.exports = { invoiceValidationSchema };