const Joi = require('joi');

const getDailyRateSchema = Joi.object({
    currentWeight: Joi.number().required(),
    height: Joi.number().required(),
    age: Joi.number().required(),
    desiredWeight: Joi.number().required(),
    bloodType: Joi.number().required(),
});

module.exports = {
    getDailyRateSchema,
};