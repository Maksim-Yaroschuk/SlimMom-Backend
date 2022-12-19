const { Product } = require('../../models');
const calculateDailyRate = require("./calculateDailyRate");
const notAllowedProductsObj = require("./notAllowedProductsObj");
const { createNotFoundError } = require("../../middlewares");

const getAllProductsByQuery = async (req, res, next) => {
    const { query: { title, limit = 10 } } = req;
    const titleFromUrl = decodeURI(title).trim();
    const products = await Product.find({
        $or: [
            { 'title.ua': { $regex: titleFromUrl, $options: 'i' } },
        ],
    }).limit(limit);
    if (products.length === 0) {
        return next(createNotFoundError());
    }
    return res.status(200).json({ data: products });
};

const getDailyRateController = async (req, res) => {
    const dailyRate = await calculateDailyRate(req.body);
    const { notAllowedProducts, notAllowedProductsAll } = await notAllowedProductsObj(req.body.bloodType);
    return res.status(200).json({ dailyRate, notAllowedProducts, notAllowedProductsAll, });
};

module.exports = {
    getAllProductsByQuery,
    getDailyRateController,
};