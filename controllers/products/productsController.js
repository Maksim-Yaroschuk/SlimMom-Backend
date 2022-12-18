const { Product } = require("../../models/products.model");

// const getAllProducts = async (req, res) => {
//     const allProducts = await Product.find();
//     res.status(200).json({ data: allProducts });
// };

const getNotAllowedProducts = async bloodType => {
    const blood = [null, false, false, false, false];
    blood[bloodType] = true;
    const products = Product.find({
        groupBloodNotAllowed: { $all: [blood] },
    });
    return products;
};

const notAllowedProductsObj = async bloodType => {
    const notAllowedProductsArray = await getNotAllowedProducts(bloodType);
    const arr = [];
    notAllowedProductsArray.map(({ title }) => arr.push(title.ua));
    let notAllowedProductsAll = [...new Set(arr)];
    let notAllowedProducts = [];
    const message = ['You can eat everything'];
    if (notAllowedProductsAll[0] === undefined) {
        notAllowedProducts = message;
    } else {
        do {
            const index = Math.floor(Math.random() * notAllowedProductsAll.length);
            if (notAllowedProducts.includes(notAllowedProductsAll[index]) || notAllowedProducts.includes('undefined')) {
                break;
            } else {
                notAllowedProducts.push(notAllowedProductsAll[index]);
            }
        } while (notAllowedProducts.length !== 5);
    };
    if (notAllowedProductsAll.length === 0) {
        notAllowedProductsAll = message;
    };
    const result = { notAllowedProductsAll, notAllowedProducts };
    return result;
};

const calculateDailyRate = ({ currentWeight, height, age, desiredWeight }) => {
    return Math.floor(
        10 * currentWeight +
        6.25 * height -
        5 * age -
        161 - 10 * (currentWeight - desiredWeight),
    );
};

const getDailyRateController = async (req, res) => {
    const dailyRate = await calculateDailyRate(req.body);
    const { notAllowedProducts, notAllowedProductsAll } = await notAllowedProductsObj(req.body.bloodType);
    return res.status(200).json({ dailyRate, notAllowedProducts, notAllowedProductsAll, });
};

module.exports = {
    // getAllProducts,
    getNotAllowedProducts,
    getDailyRateController,
};