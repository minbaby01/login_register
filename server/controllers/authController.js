const jwt = require('jsonwebtoken');

const authService = require('../services/authService');


const authCheck = (req, res) => {
    res.json("OK");
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const user = await authService.registerUser( name, email, password );
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await authService.loginUser(email, password);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}

const getProfile = (req, res) => {
    const { token } = req.cookies;

    return authService.getProfile(token);
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
        return await authService.changePassword( _id, oldPassword, newPassword );
    } catch (error) {
        console.log(error);
    }
}

module.exports = { authCheck, registerUser, loginUser, getProfile, logOut, changePassword };
