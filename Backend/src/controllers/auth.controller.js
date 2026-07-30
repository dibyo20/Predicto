const userModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redis = require('../config/cache.js');

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @payload { username, email, password }   -->   "user": { "username", "email", "password", "_id", "__v": 0 }
 */
async function register(req, res) {
    const { username, email, password } = req.body;
    const isUserExists = await userModel.findOne({
        $or: [{ username: username }, { email: email }],
    });

    if (isUserExists) {
        res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
        message: "User registered successfully",
        user
    });
}

/**
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 * @payload { email, username, password }   -->   "user": { "username", "email", "password", "_id", "__v": 0 }
 */
async function login(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ username: username }, { email: email }],
    }).select("+password");

    if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
    }

    const blackListedToken = await redis.get(`blaclist:${req.cookies.token}`);

    if (blackListedToken) {
        res.status(401).json({ message: "Unauthorized (Token is blacklisted)" });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
        message: "User logged in successfully",
        user
    });
}

/** 
 * @desc Get user profile
 * @route GET /api/auth/profile
 * @access Private
 * @payload { username, email, password }   -->   "user": { "username", "email", "_id", "__v": 0 }
*/
async function profile(req, res) {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message: "User profile",
        user
    });
}

/**
 * @desc Logout user
 * @route POST /api/auth/logout
 * @access Private
 */
async function logout(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: "Token not provided" });
    }

    res.clearCookie('token');

    await redis.set(`blacklist:${token}`, 'blacklisted', "EX", 24 * 60 * 60);

    res.status(200).json({
        message: "Logout Successfull",
        token: token,
    });
}

module.exports = {
    register,
    login,
    profile,
    logout,
}