const { MyProducts } = require("../../models");
const { NotFound } = require("http-errors");

const deleteMyProducts = async (req, res) => {
  const { productId } = req.params;
  const { date } = req.body;

  const product = await MyProducts.findOneAndUpdate(
    { date, productInfo: { $elemMatch: { _id: productId } } },
    {
      $pull: {
        productInfo: { _id: productId },
      },
    }
  );

  if(product.productInfo.length === 0) {
    await MyProducts.findOneAndDelete(
      { date },
    );
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
