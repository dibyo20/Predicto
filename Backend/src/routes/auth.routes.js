const router = require('express').Router();
const { register, login, profile, logout, } = require('../controllers/auth.controller.js');
const { verifyToken } = require('../middlewares/auth.middleware.js');
const { validateRegister, validateLogin } = require('../middlewares/validation.middleware.js');

/**
 * @desc User registration
 * @route POST /api/auth/register
 * @access Public
 */
router.post('/register', validateRegister, register);

/**
 * @desc User login
 * @route POST /api/auth/login
 * @access Public
 */
router.post('/login', validateLogin, login);

/**
 * @desc User profile
 * @route GET /api/auth/profile
 * @access Private
 */
router.get('/profile', verifyToken, profile);

/**
 * @desc User logout
 * @route POST /api/auth/logout
 * @access Private
 */
router.post('/logout', verifyToken, logout);

module.exports = router; 