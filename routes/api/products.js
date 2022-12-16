// "ФОРМУЛА ДЛЯ РОЗРАХУНКУ ДЕННОЇ НОРМИ КАЛОРІЙ ДЛЯ ЖІНОК
// 10 * вага + 6.25 * зріст - 5 * вік - 161 - 10 * (вага - бажана вага)"

const express = require("express");
const router = express.Router();

const { tryCatchWrapper } = require("../../helpers");
const products = require("../../controllers/productsController");

router.get("/", tryCatchWrapper(products.getAllProducts));

// router.get("/:bloodtype", tryCatchWrapper(products.getNotAllowedProducts))

module.exports = router;