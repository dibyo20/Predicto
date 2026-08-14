const { body, oneOf, validationResult } = require("express-validator");

const validateRegister = [
    body("username")
        .trim()
        .notEmpty().withMessage("Username is required.")
        .bail()
        .matches(/^[a-zA-Z0-9_]{3,30}$/)
        .withMessage("Username must be 3-30 characters long and contain only letters, numbers, and underscores."),

    body("email")
        .trim()
        .notEmpty().withMessage("Email address is required.")
        .bail()
        .isEmail().withMessage("Please provide a valid email address."),

    body("password")
        .notEmpty().withMessage("Password is required.")
        .bail()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    }
];

const validateLogin = [
    oneOf([
        body("username").trim().notEmpty(),
        body("email").trim().notEmpty()
    ], { message: "Username or Email is required." }),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required."),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    }
];

module.exports = {
    validateRegister,
    validateLogin
};