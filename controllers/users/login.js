const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User, Session } = require("../../models");

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const { name, infouser } = user;
    if (!user || !user.comparePassword(password)) {
        throw new Unauthorized("Email or password is wrong");
    }
    
    const newSession = await Session.create({
        id: user._id,
    });
    console.log(newSession);

    const token = jwt.sign({id: user._id, sid: newSession._id }, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({id: user._id, sid: newSession._id }, JWT_SECRET, { expiresIn: "30d" });
    await User.findByIdAndUpdate(user._id, { token }, { refreshToken });
    res.json({
        status: "success",
        code: 200,
        data: {
            token,
            refreshToken,
            sid: newSession._id,
            name,
            infouser 
        }
    });
};

module.exports = login; 


// const { Unauthorized } = require("http-errors");
// const jwt = require("jsonwebtoken");

// const { JWT_SECRET } = process.env;

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     const { name, infouser } = user;
//     if (!user || !user.comparePassword(password)) {
//         throw new Unauthorized("Email or password is wrong");
//     }
//     const payload = {
//         id: user._id
//     };
//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
//     await User.findByIdAndUpdate(user._id, { token });
//     res.json({
//         status: "success",
//         code: 200,
//         data: {
//             token,
//             name,
//             infouser 
//         }
//     });
// };

// module.exports = login; 
