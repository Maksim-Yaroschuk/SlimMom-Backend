const { MyProducts } = require("../../models");
const countCalories = require("./countCalories");

const addMyProducts = async (req, res) => {
  const { _id } = req.user;
  const { productName, productWeight, date } = req.body;
  const productCalories = await countCalories(productName, productWeight);


  const product = await MyProducts.findOne({
    date,
    productInfo: { $elemMatch: { productName } },
  });


  if (product) {
    const newWeight = product.productInfo.map(
      (productInfo) => Number(productInfo.productWeight) + Number(productWeight)
    );

    const newCalories = product.productInfo.map(
      (productInfo) =>
        Number(productInfo.productCalories) + Number(productCalories)
    );

    await MyProducts.create({
      date,
      owner: _id,
      productInfo: [
        {
          productCalories: newCalories.toString(),
          productName,
          productWeight: newWeight.toString(),
        },
      ],
    });

    await MyProducts.findOneAndDelete({
      date,
      productInfo: { $elemMatch: { productName } },
    });

    return res.status(201).json({ success: "success", code: 201, product });
  }
  if (await MyProducts.findOne({ date, owner: _id })) {
    const productUpdate = await MyProducts.findOneAndUpdate(
      { date },
      {
        $push: {
          productInfo: { productCalories, productName, productWeight },
        },
      }
    );

    return res
      .status(201)
      .json({ success: "success", code: 201, productUpdate });
  }

  const productAdd = await MyProducts.create({
    date,
    owner: _id,
    productInfo: [{ productCalories, productName, productWeight }],
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
