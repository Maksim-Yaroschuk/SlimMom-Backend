const { Product } = require('../../models');

const getOneProduct = async query => {
    const products = await Product.find({
        'title.ua': { $regex: `${query}`, $options: 'i' },
    });
    return products;
};

module.exports = getOneProduct;