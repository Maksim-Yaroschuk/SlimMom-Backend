const { MyProducts } = require("../../models");
const { NotFound } = require("http-errors");
// const isFutureDate = require("./isFutureDate");

const deleteMyProducts = async (req, res) => {
  const { productId } = req.params;
  const { data } = req.body;

  const product = await MyProducts.findOneAndUpdate(
    { data },
    {
      $pull: {
        productInfo: { _id: productId },
      },
    }
  );
  
  // if (!isFutureDate(date)) {
  //   Conflict("Wrong date (the date cannot be in the future)");
  // }
  
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
