const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    categories: {
        type: Array,
    },
    weight: {
        type: String,
    },
    title: {
        type: Object,
    },
    calories: {
        type: String,
    },
    groupBloodNotAllowed: {
        type: Array,
    },
});

const Product = model("product", productSchema);

module.exports = {
    Product,
};