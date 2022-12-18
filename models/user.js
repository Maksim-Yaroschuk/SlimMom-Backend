const {Schema, model} = require('mongoose');
const Joi = require('joi');
const bcrypt = require("bcryptjs");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
      },
      token: {
        type: String,
        default: null
      },
      
}, {versionKey: false, timestamps: true});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(), 
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(), 
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSignupSchema,
  joiLoginSchema,
};