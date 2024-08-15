const productService = require('../services/productService');

const createProduct = async (req, res) => {
    try {
        const { name, price, quantity, description } = req.body;
        const product = await productService.createProduct( name, price, quantity, description );
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getProduct(id);
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async (req, res) => {
    try {   
        const { id } = req.params;
        const { name, price, quantity, description } = req.body;

        if ( !id || !name || !price || !quantity || !description ) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const product = await productService.updateProduct( id, name, price, quantity, description );
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.deleteProduct(id);
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct }