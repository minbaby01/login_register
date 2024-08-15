const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (name, email, password) => {
    if (!name) {
        return json({
            error: "Name is required"
        })
    }
    if (!password || password.length < 6) {
        return json({
            error: "Password is required and should be 6 characters long"
        })
    }
    const exist = await User.findOne({ email });
    if (exist) {
        return json({
            error: "Email is taken"
        })
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    return await User.create({ name, email, password: hashedPassword });
}

const passwordCompare = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            const match = await passwordCompare(password, user.password);
            if (!match) {
                return "Email or password is incorrect";
            }
            else {
                const access_token = jwt.sign({
                    user: user._id, name: user.name, email: user.email
                },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' });

                return {
                    access_token,
                    user: {
                        name: user.name,
                        email: user.email
                    }
                }
            }
        }
        else {
            return "Email or password is incorrect";
        }

    } catch (error) {
        console.log(error);
    }
}

const getProfile = (token) => {
    if (!token) {
        return json(null);
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) throw err;
            return json(user);
        })
    }
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

const changePassword = async (id, oldPassword, newPassword) => {
    try {
        const user = await User.findById(id);
        const match = await passwordCompare(oldPassword, user.password);
        if (!match) {
            return json({
                error: "Current password is incorrect"
            });
        }
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        const userResponse = { ...user._doc };
        delete userResponse.password;

        return userResponse;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { registerUser, loginUser, getProfile, logOut, changePassword };
