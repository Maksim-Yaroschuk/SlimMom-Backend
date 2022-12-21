const { BadRequest } = require("http-errors");
const { MyProducts } = require("../../models");
const countCalories = require("./countCalories");
const isFutureDate = require("./isFutureDate");

const addMyProducts = async (req, res) => {
  const { _id } = req.user;
  const { date, productName, productWeight } = req.body;

  if (!isFutureDate(date)) {
    BadRequest("Wrong date (the date cannot be in the future)");
  }

  const productCalories = await countCalories(productName, productWeight);

  const productAdd = await MyProducts.create({
    ...req.body,
    productCalories,
    owner: _id,
  });

  return res.status(201).json({
    success: "success",
    code: 201,
    data: { productAdd },
  });
};

module.exports = {
  addMyProducts,
};
