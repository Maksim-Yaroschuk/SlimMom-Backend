const express = require("express");

const { validation, auth, ctrlWrapper, updateDailyRateSchema, joiSignupSchema, joiLoginSchema } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/:id/infouser", validation(updateDailyRateSchema), ctrlWrapper(ctrl.updateById));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
