const { MyProducts } = require("../../models");
const countCalories = require("./countCalories");

const addMyProducts = async (req, res) => {
  const { _id } = req.user;
  const { productName, productWeight, date } = req.body;
  const productCalories = await countCalories(productName, productWeight);

  const product = await MyProducts.findOne({
    date,
    owner: _id,
    productInfo: { $elemMatch: { productName } },
  });
  if (product) {
    console.log(1);
    const index = product.productInfo.findIndex(
      (product) => product.productName === productName
    );

    const newWeight =
      Number(product.productInfo[index].productWeight) + Number(productWeight);

    const newCalories =
      Number(product.productInfo[index].productCalories) +
      Number(productCalories);

    await MyProducts.findOneAndUpdate(
      { date, owner: _id },
      {
        $pull: {
          productInfo: { productName },
        },
      }
    );
    await MyProducts.findOneAndUpdate(
      { date, owner: _id },
      {
        $push: {
          productInfo: {
            $each: [{
              productCalories: newCalories.toString(),
              productName,
              productWeight: newWeight.toString(),
            }],
            $position: 0
          }
        },
      }
    );

    return res.status(201).json({ success: "success", code: 201, product });
  }

  if (await MyProducts.findOne({ date, owner: _id })) {
    console.log(2);
    const productUpdate = await MyProducts.findOneAndUpdate(
      { date, owner: _id },
      {
        $push: {
          productInfo: {
            $each: [{
              productCalories,
              productName,
              productWeight,
            }],
            $position: 0,
          },
        },
      }
    );

    return res
      .status(201)
      .json({ success: "success", code: 201, productUpdate });
  }
  console.log(3);

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
