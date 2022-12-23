const { Conflict } = require("http-errors");
const { MyProducts } = require("../../models");
const countCalories = require("./countCalories");

const addMyProducts = async (req, res) => {
  const { _id } = req.user;
  const { productName, productWeight, date } = req.body;
  const productCalories = await countCalories(productName, productWeight);


  if (!isFutureDate(date)) {
    Conflict("Wrong date (the date cannot be in the future)");
  }

  if (await MyProducts.findOne({ date })) {
    const productAdd = await MyProducts.findOneAndUpdate(
      { date },
      {
        $push: {
          productInfo: { productCalories, productName, productWeight },
        },
      }
    );


    return res.status(201).json({ success: "success", code: 201, productAdd });
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
