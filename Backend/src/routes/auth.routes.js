const router = require('express').Router();
const { register, login, profile, logout, } = require('../controllers/auth.controller.js');
const verifyToken = require('../middlewares/auth.middleware.js');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, profile);
router.post('/logout', verifyToken, logout);

module.exports = router; 