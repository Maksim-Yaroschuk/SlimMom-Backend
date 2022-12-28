const {Session } = require("../../models");

const logout = async (req, res) => {
    const currentSession = req.session;
    console.log(currentSession);
    await Session.deleteOne({ _id: currentSession._id });
    return res.status(204).end();
};

module.exports = logout; 

// const { User } = require("../../models");

// const logout = async (req, res) => {
//     const { _id } = req.user;
//     await User.findByIdAndUpdate(_id, { token: null });
//     res.status(204).json();
// };

// module.exports = logout; 