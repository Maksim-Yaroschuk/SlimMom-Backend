const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const auth = require("./auth");
const {
  getDailyRateSchema,
  joiSignupSchema,
  joiLoginSchema,
  joiAddMyProductSchema,
  joiDeleteMyProductSchema,
  joiGetMyProductSchema,
} = require("./validationSchemas");
const createNotFoundError = require("./createNotFoundError");

module.exports = {
  validation,
  ctrlWrapper,
  auth,
  getDailyRateSchema,
  createNotFoundError,
  joiSignupSchema,
  joiLoginSchema,
  joiAddMyProductSchema,
  joiDeleteMyProductSchema,
  joiGetMyProductSchema,
};
