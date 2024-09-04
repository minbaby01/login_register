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

const searchProduct = async (name, category, minPrice, maxPrice) => {
    let query = {};

    if (name) {
        query.name = { $regex: name, $options: 'i' };
    }
    
    if (category) {
        query.category = category;
    }

    if (minPrice) {
        query.price = { ...query.price, $gte: minPrice };
    }

    if (maxPrice) {
        query.price = { ...query.price, $lte: maxPrice }; 
    }
    return await Product.find(query);
}

module.exports = { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct, searchProduct }