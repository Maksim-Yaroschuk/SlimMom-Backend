const { User, Session } = require("../../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const refreshTokens = async (req, res) => {
    const authorizationHeader = req.get("Authorization");
   
    if (authorizationHeader) {
        const activeSession = await Session.findById(req.body.sid);
    if (!activeSession) {
      return res.status(404).send({ message: "Invalid session" });
    }
    const reqRefreshToken = authorizationHeader.replace("Bearer ", "");
    
    try {
        const { id, sid }  = jwt.verify(reqRefreshToken, JWT_SECRET);

        const user = await User.findById(id);
        const session = await Session.findById(sid);
        if (!user) {
          return res.status(404).send({ message: "Invalid user" });
        }
        if (!session) {
          return res.status(404).send({ message: "Invalid session" });
        }
        await Session.findByIdAndDelete(sid);
        const newSession = await Session.create({
          id: user._id,
        });
        const newtoken = jwt.sign({id: user._id, sid: newSession._id }, JWT_SECRET, { expiresIn: "1h" });
        const newrefreshToken = jwt.sign({id: user._id, sid: newSession._id }, JWT_SECRET, { expiresIn: "30d" });

        return res
          .status(200)
          .send({ newtoken, newrefreshToken, newSid: newSession._id });
    } catch (err) {
      await Session.findByIdAndDelete(req.body.sid);
      return res.status(401).send({ message: "Unauthorized" });
    }
  }
  return res.status(400).send({ message: "No token provided" });
};

module.exports = refreshTokens; 