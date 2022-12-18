const express = require("express");
const router = express.Router();

const { validation, getDailyRateSchema, ctrlWrapper  } = require("../../middlewares");
const { products: ctrl } = require("../../controllers");

// router.get("/", tryCatchWrapper(products.getAllProducts));

router.get("/", validation(getDailyRateSchema), ctrlWrapper(ctrl.getDailyRateController));

module.exports = router;