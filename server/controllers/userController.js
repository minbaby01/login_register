const userService = require('../services/userService');

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await userService.createUser(name, email, password, role);
        if (user.message) {
            return res.status(user.statusCode).json(user.message);
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUser(id);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        const user = await userService.updateUser(id, name, email, password, role);
        if (user.message) {
            return res.status(user.statusCode).json(user.message);
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.deleteUser(id);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser }