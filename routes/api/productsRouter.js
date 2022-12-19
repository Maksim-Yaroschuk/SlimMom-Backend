const express = require("express");
const router = express.Router();

const { validation, getDailyRateSchema, ctrlWrapper  } = require("../../middlewares");
const { products: ctrl } = require("../../controllers");

router.get("/", validation(getDailyRateSchema), ctrlWrapper(ctrl.getDailyRateController));

router.get("/searchProducts", ctrlWrapper(ctrl.getAllProductsByQuery));

module.exports = router;