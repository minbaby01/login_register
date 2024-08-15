const User = require('../models/user');
const bcrypt = require('bcrypt');

const createUser = async (name, email, password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return await User.create({ name, email, password: hashedPassword });
}

const getAllUsers = async () => {
    return await User.find({});
}

const getUser = async (id) => {
    return await User.findById(id);
}

const updateUser = async (id, name, email, password) => {
    if (!password) return await User.findByIdAndUpdate(id, { name, email });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return await User.findByIdAndUpdate(id, { name, email, password: hashedPassword });
}

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}

module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser }