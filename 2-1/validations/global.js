const Joi = require("joi");

const paginationSchema = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  search: Joi.string(),
});

module.exports = { paginationSchema };
