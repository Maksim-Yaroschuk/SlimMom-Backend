// const { Conflict } = require("http-errors");
const { MyProducts } = require("../../models");
const countCalories = require("./countCalories");

const addMyProducts = async (req, res) => {
  const { _id } = req.user;
  const { productName, productWeight, date } = req.body;
  const productCalories = await countCalories(productName, productWeight);

  console.log(_id);

  // const findSameProductName = await MyProducts.findOne({
  //   date,
  //   productInfo: { $elemMatch: { productName } },
  // });

  // if (findSameProductName) {
  //   console.log(findSameProductName);
  //   const productUpdate = await MyProducts.findOneAndUpdate(
  //     { date },
  //     {
  //       productInfo: { productCalories, productName, productWeight },
  //     }
  //   );

  //   return res
  //     .status(201)
  //     .json({ success: "success", code: 201, productUpdate, });
  // }


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
