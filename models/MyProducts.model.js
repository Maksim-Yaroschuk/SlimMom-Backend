const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "productName is required"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  productWeight: {
    type: String,
  },
  productCalories: {
    type: String,
  },
});

const MyProducts = model("myproducts", productSchema);

module.exports = { MyProducts };
