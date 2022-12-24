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

  console.log("log 1");

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleSignupRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  console.log("log 2", fullUrl);

  const urlObj = new URL(fullUrl);
  console.log("log 3", urlObj);
  //   console.log("logggg", queryString.parse(fullUrl));

  const urlParams = queryString.parse(urlObj.search);
  console.log("log 4", urlParams);
  const parseUrlParams = Object.values(urlParams);
  //   console.log("logggg", parseUrlParams[0]);

  const code = parseUrlParams[0];
  console.log("log 5", code);

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

  console.log("USER DATA", userData);

  //   const userPassword = uid();
  //   console.log(userPassword);
  //   const hashPassword = bcrypt.hashSync("123456789", bcrypt.genSaltSync(10));

  //   const newUser = {
  //     name: userData.data.given_name,
  //     email: userData.data.email,
  //     password: "123456789",
  //     };

  const newUser = {
    name: userData.data.given_name,
    email: userData.data.email,
    password: "123456789",
  };

  //   const email = userData.data.email;

  //   const jsonNewUser = JSON.stringify(newUser);
  //   console.log(JSON.stringify(jsonNewUser));

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
    `${process.env.FRONTEND_URL}?name=${userUpdate.name}&email=${userUpdate.email}&token=${userUpdate.token}`
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

  console.log("log 1");

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleLoginRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  console.log("log 2", fullUrl);

  const urlObj = new URL(fullUrl);
  console.log("log 3", urlObj);
  //   console.log("logggg", queryString.parse(fullUrl));

  const urlParams = queryString.parse(urlObj.search);
  console.log("log 4", urlParams);
  const parseUrlParams = Object.values(urlParams);
  //   console.log("logggg", parseUrlParams[0]);

  const code = parseUrlParams[0];
  console.log("log 5", code);

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

  console.log("USER DATA", userData);

  //   const userPassword = uid();
  //   console.log(userPassword);
  //   const hashPassword = bcrypt.hashSync("123456789", bcrypt.genSaltSync(10));

  //   const newUser = {
  //     name: userData.data.given_name,
  //     email: userData.data.email,
  //     password: "123456789",
  //     };

  // const newUser = {
  //   "name": userData.data.given_name,
  //   "email": userData.data.email,
  //   "password": "123456789",
  // };

  //   const email = userData.data.email;

  //   const jsonNewUser = JSON.stringify(newUser);
  //   console.log(JSON.stringify(jsonNewUser));

  const firstSearchUser = await User.findOne({ email: userData.data.email });

  if (!firstSearchUser) {
    return res.redirect(`${process.env.FRONTEND_URL_REGISTER}`);
  }

  // const user = await User.findOne({ email: userData.data.email });
  // console.log("user", user);

  const payload = {
    id: firstSearchUser._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  console.log("token", token);

  await User.findByIdAndUpdate(firstSearchUser._id, { token });
  const userUpdate = await User.findOne({ email: userData.data.email });
  console.log(userUpdate);

  return res.redirect(
    `${process.env.FRONTEND_URL}?name=${userUpdate.name}&email=${userUpdate.email}&token=${userUpdate.token}`
  );
};

module.exports = {
  googleAuthSignup,
  googleSignupRedirect,
  googleAuthLogin,
  googleLoginRedirect,
};
