const { BadRequest } = require("http-errors");
const { MyProducts } = require("../../models");
const isFutureDate = require("./isFutureDate");

const getMyProducts = async (req, res) => {
  const { date } = req.body;
  const { _id } = req.user;

  if (!isFutureDate(date)) {
    BadRequest("Wrong date (the date cannot be in the future)");
  }

  const productList = await MyProducts.find({ owner: _id, date });

  return res.status(200).json({ status: "success", code: 200, productList });
};

module.exports = {
  getMyProducts,
};
