const Joi = require('joi');

const getDailyRateSchema = Joi.object({
  currentWeight: Joi.number().required(),
  height: Joi.number().required(),
  age: Joi.number().required(),
  desiredWeight: Joi.number().required(),
  bloodType: Joi.number().required(),
});

const updateDailyRateSchema = Joi.object({
  currentWeight: Joi.number().required(),
  height: Joi.number().required(),
  age: Joi.number().required(),
  desiredWeight: Joi.number().required(),
  bloodType: Joi.number().required(),
  dailyRate: Joi.number().required(),
});

// const updateDailyRateSchema = Joi.object({
//   age: Joi.number().required(),
// });

const joiSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(), 
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(), 
  password: Joi.string().min(6).required(),
});


module.exports = {
  getDailyRateSchema,
  updateDailyRateSchema,
  joiSignupSchema,
  joiLoginSchema,
};