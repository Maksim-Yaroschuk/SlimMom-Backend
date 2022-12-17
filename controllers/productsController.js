const { Product } = require("../models/products.model");
// const { createNotFoundError } = require("../helpers");

const getAllProducts = async (req, res) => {
    const allProducts = await Product.find();
    res.status(200).json({ data: allProducts });
};

// const getNotAllowedProducts = async (req, res) => {
// };

module.exports = {
    getAllProducts,
    // getNotAllowedProducts,
};