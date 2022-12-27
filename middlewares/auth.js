const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User, Session } = require("../models");

const {JWT_SECRET} = process.env;

const auth = async (req, res, next) => {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader) {
      const token = authorizationHeader.replace("Bearer ", "");

      try {
        const { id, sid } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        const session = await Session.findById(sid);
        if (!user) {
            return res.status(404).send({ message: "Invalid user" });
        }
        if (!session) {
            return res.status(404).send({ message: "Invalid session" });
        }
        req.user = user;
        req.session = session;
        next();
        } catch (err) {
            return res.status(401).send({ message: "Unauthorized" });
      }
    } else return res.status(400).send({ message: "No token provided" });
  };

module.exports = auth;

// const { Unauthorized } = require("http-errors");
// const jwt = require("jsonwebtoken");
// const { User } = require("../models");

// const {JWT_SECRET} = process.env;

// const auth = async (req, res, next) => {
//     const { authorization = "" } = req.headers;
//     const [bearer, token] = authorization.split(" ");

//     try {
//         if (bearer !== "Bearer") {
//             throw new Unauthorized("Not authorized");
//         };
//         const { id } = jwt.verify(token, JWT_SECRET);
//         const user = await User.findById(id);
//         if (!user || !user.token) {
//             throw new Unauthorized("Not authorized");
//         };
//         req.user = user;
//         next();
//     } catch (error) {
//         if (error.message === "Invalid sugnature") {
//             error.status = 401;
//         };
//         next(error);
//     };
// };

// module.exports = auth;