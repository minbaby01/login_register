const Product = require('../models/product');

const createProduct = async (name, price, quantity, description) => {
    return await Product.create({ name, price, quantity, description });
}

const getAllProducts = async () => {
    return await Product.find({});
}

const getProduct = async (id) => {
    return await Product.findById(id);
}

const updateProduct = async (id, name, price, quantity, description) => {
    return await Product.findByIdAndUpdate(id, { name, price, quantity, description });
}

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
}

module.exports = { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct }