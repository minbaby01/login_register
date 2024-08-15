const express = require('express');
const router = express.Router();
const cors = require('cors');

const { createUser, getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController.js')

router.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)

router.get('/api/product1', (req, res) => {
    res.json('product1');
})
router.post('/api/users', createUser)
router.get('/api/users', getAllUsers)
router.get('/api/users/:id', getUser)
router.put('/api/users/:id', updateUser)
router.delete('/api/users/:id', deleteUser)

module.exports = router