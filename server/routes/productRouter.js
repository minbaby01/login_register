const express = require('express');
const router = express.Router();
const cors = require('cors');

const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController.js');
const auth = require('../middleware/auth.js');

router.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)
router.all("*", auth);

router.get('/api/product', (req, res) => {
    res.status(200).json("OK");
})
router.post('/api/products', createProduct)
router.get('/api/products', getAllProducts)
router.get('/api/products/:id', getProduct)
router.put('/api/products/:id', updateProduct)
router.delete('/api/products/:id', deleteProduct)

module.exports = router