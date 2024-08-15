const express = require('express')
const router = express.Router();
const cors = require('cors');

const { authCheck, registerUser, loginUser, getProfile, logOut, changePassword } = require('../controllers/authController.js')

router.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)

router.get('/', authCheck)
router.post('/api/register', registerUser)
router.post('/api/login', loginUser)
router.get('/profile', getProfile);
router.delete('/logout', logOut);
router.post('/changepassword', changePassword);

module.exports = router