const Joi = require("joi").extend(require("@joi/date"));

const getDailyRateSchema = Joi.object({
  currentWeight: Joi.number().required(),
  height: Joi.number().required(),
  age: Joi.number().required(),
  desiredWeight: Joi.number().required(),
  bloodType: Joi.number().required(),
});

const joiSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const joiAddMyProductSchema = Joi.object({
  productName: Joi.string().required(),
  productWeight: Joi.number().integer().min(5).max(5000).required(),
  date: Joi.date().format("DD.MM.YYYY").required(),
});

const joiDeleteMyProductSchema = Joi.object({
  date: Joi.date().format("DD.MM.YYYY").required(),
});

const joiGetMyProductSchema = Joi.object({
  date: Joi.date().format("DD.MM.YYYY").required(),
});

module.exports = {
  getDailyRateSchema,
  joiSignupSchema,
  joiLoginSchema,
  joiAddMyProductSchema,
  joiDeleteMyProductSchema,
  joiGetMyProductSchema,
};
