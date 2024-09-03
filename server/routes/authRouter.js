const express = require('express')
const router = express.Router();
const cors = require('cors');

const { authCheck, registerUser, loginUser, getAccount, logOut, changePassword } = require('../controllers/authController.js');
const auth = require('../middleware/auth.js');

router.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)
router.all("*", auth);

router.get('/', authCheck)
router.post('/api/register', registerUser)
router.post('/api/login', loginUser)
router.get('/api/account', getAccount);
router.delete('/logout', logOut);
router.post('/changepassword', changePassword);

module.exports = router