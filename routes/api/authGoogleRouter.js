const express = require("express");
// const tryCatchirapper . require("../helpers/try-catch-wrapper");
const {
googleAuthSignup,
googleSignupRedirect,
googleAuthLogin,
googleLoginRedirect
} = require("../../controllers/google/authGoogleControler");

const router = express.Router();

router.get("/google-signup", googleAuthSignup);

router.get("/google-signup-redirect", googleSignupRedirect);

router.get("/google-login", googleAuthLogin);

router.get("/google-login-redirect", googleLoginRedirect);

module.exports = router;
