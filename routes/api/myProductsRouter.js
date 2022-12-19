const express = require("express");

const { validation, auth, ctrlWrapper  } = require("../../middlewares");
const { myProducts: ctrl } = require("../../controllers");

const router = express.Router();

//роути на додавання, видалення продукту в конкретний день
// роут на отримання всієї інформації

router.post("/", );
router.delete("/", );
router.get("/", );

module.exports = router;
