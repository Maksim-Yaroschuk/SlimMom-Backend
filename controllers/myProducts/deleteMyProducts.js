const { MyProducts } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");
const isFutureDate = require("./isFutureDate");

const deleteMyProducts = async (req, res) => {
  const { productId } = req.params;
  const { date } = req.body;

  const product = await MyProducts.findByIdAndRemove(productId);

  if (!isFutureDate(date)) {
    BadRequest("Wrong date (the date cannot be in the future)");
  }
  if (!product) {
    NotFound(`Product with id = ${productId} not found`);
  }

  return res.status(200).json({
    status: "success",
    code: 200,
    data: { product },
  });
};

module.exports = {
  deleteMyProducts,
};
