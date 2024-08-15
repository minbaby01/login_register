const express = require('express');
const router = express.Router();
const cors = require('cors');

const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController.js')

router.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)

router.get('/api/product1', (req, res) => {
    res.json('product1');
})
router.post('/api/products', createProduct)
router.get('/api/products', getAllProducts)
router.get('/api/products/:id', getProduct)
router.put('/api/products/:id', updateProduct)
router.delete('/api/products/:id', deleteProduct)

module.exports = router