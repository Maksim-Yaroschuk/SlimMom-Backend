const express = require("express");
const authRouter = express.Router();

authRouter.get("/", () => console.log("Test"));

module.exports = authRouter;
