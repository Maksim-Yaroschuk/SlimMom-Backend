const {Schema, model} = require('mongoose');
const bcrypt = require("bcrypt");

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

const User = model("user", userSchema);

module.exports = {
  User,
};