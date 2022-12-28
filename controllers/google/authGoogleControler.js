const axios = require("axios");
const queryString = require("node:querystring");
const { User } = require("../../models/user.model");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const googleAuthSignup = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/auth/google-signup-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleSignupRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const parseUrlParams = Object.values(urlParams);
  const code = parseUrlParams[0];

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/auth/google-signup-redirect`,
      grant_type: "authorization_code",
      code: code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const newUser = {
    name: userData.data.given_name,
    email: userData.data.email,
    password: "123456789",
  };

  const firstSearchUser = await User.findOne({ email: userData.data.email });

  if (firstSearchUser) {
    return res.redirect(`${process.env.FRONTEND_URL_LOGIN}`);
  }
  await User.create(newUser);
  const user = await User.findOne({ email: userData.data.email });
  console.log("user", user);

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  console.log("token", token);

  await User.findByIdAndUpdate(user._id, { token });
  const userUpdate = await User.findOne({ email: userData.data.email });
  console.log(userUpdate);

  return res.redirect(
    `${process.env.FRONTEND_URL}?name=${userUpdate.name}&email=${userUpdate.email}&token=${userUpdate.token}&userid=${userUpdate._id}`
  );
};

const googleAuthLogin = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/auth/google-login-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleLoginRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const parseUrlParams = Object.values(urlParams);
  const code = parseUrlParams[0];

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/auth/google-login-redirect`,
      grant_type: "authorization_code",
      code: code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const firstSearchUser = await User.findOne({ email: userData.data.email });

  if (!firstSearchUser) {
    return res.redirect(`${process.env.FRONTEND_URL_REGISTER}`);
  }

  const payload = {
    id: firstSearchUser._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  await User.findByIdAndUpdate(firstSearchUser._id, { token });
  const userUpdate = await User.findOne({ email: userData.data.email });

  return res.redirect(
    `${process.env.FRONTEND_URL}?name=${userUpdate.name}&email=${userUpdate.email}&token=${userUpdate.token}`
  );
};

const updateUserGoogleAuth = async (req, res) => {
  const userId = req.body.userid;
  delete req.body.userid;
  await User.findByIdAndUpdate(userId, { infouser: req.body });
};

module.exports = {
  googleAuthSignup,
  googleSignupRedirect,
  googleAuthLogin,
  googleLoginRedirect,
  updateUserGoogleAuth,
};
