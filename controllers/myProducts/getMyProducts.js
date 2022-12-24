const { MyProducts } = require("../../models");

const getMyProducts = async (req, res) => {
  const { date } = req.body;
  const { _id } = req.user;

  const productList = await MyProducts.find({ owner: _id, date });
  console.log(productList);
  return res.status(200).json({ status: "success", code: 200, productList });
};

module.exports = {
  getMyProducts,
};
