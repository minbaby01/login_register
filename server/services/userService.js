const User = require('../models/user');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

const createUser = async (name, email, password, role) => {
    const emailCheckResult = await checkEmailExists(email);
    if (emailCheckResult) return emailCheckResult;

    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({ name, email, password: hashedPassword, role });
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

const getAllUsers = async () => {
    return await User.find({}).select('-password');
}

const getUser = async (id) => {
    return await User.findById(id).select('-password');
}

const updateUser = async (id, name, inputEmail, password, role) => {
    const user = await getUser(id);

    if (user.email !== inputEmail) {
        const emailCheckResult = await checkEmailExists(inputEmail);
        if (emailCheckResult) return emailCheckResult;
    }

    const updateData = { name, role };
    if (user.email !== inputEmail) updateData.email = inputEmail;
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, salt);
        updateData.password = hashedPassword;
    }

    return await User.findByIdAndUpdate(id, updateData);
}

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}

const checkEmailExists = async (inputEmail) => {
    const user = await User.findOne({ email: inputEmail });
    if (user) return { message: "Email already exists", statusCode: 400 };

    return false;
}

module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser }