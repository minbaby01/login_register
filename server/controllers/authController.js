const jwt = require('jsonwebtoken');

const authService = require('../services/authService');

const authCheck = (req, res) => {
    res.status(200).json("HELLO");
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await authService.registerUser(name, email, password);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUser(email, password);
        if (user.statusCode && user.statusCode != 200) {
            return res.status(user.statusCode).json(user.message);
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

const getAccount = (req, res) => {
    return res.status(200).json(req.user);
}

const logOut = (req, res) => {
    return res.cookie('token', '').json(true);
}

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.JWT_REFRESH);
}

const changePassword = async (req, res) => {
    try {
        const { _id, oldPassword, newPassword } = req.body;
        return await authService.changePassword(_id, oldPassword, newPassword);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { authCheck, registerUser, loginUser, getAccount, logOut, changePassword };
