const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const updateById = require("./updateById");
const logout = require("./logout");
const refreshTokens = require("./refreshTokens");

module.exports = {
    signup,
    login,
    getCurrent,
    logout,
    updateById,
    refreshTokens
};