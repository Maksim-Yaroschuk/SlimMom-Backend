const express = require("express");
const router = express.Router();

const { validationBody } = require("../../middleware/validationBody");
const { getDailyRateSchema } = require("../../middleware/validationSchemas");
const { tryCatchWrapper } = require("../../helpers");
const products = require("../../controllers/productsController");

// router.get("/", tryCatchWrapper(products.getAllProducts));

router.get("/", validationBody(getDailyRateSchema), tryCatchWrapper(products.getDailyRateController));

module.exports = router;