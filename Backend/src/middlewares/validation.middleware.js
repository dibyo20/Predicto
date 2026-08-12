const validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || typeof username !== "string" || username.trim() === "") {
        return res.status(400).json({ message: "Username is required." });
    }
    
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ 
            message: "Username must be 3-30 characters long and contain only letters, numbers, and underscores." 
        });
    }

    if (!email || typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ message: "Email address is required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Please provide a valid email address." });
    }

    if (!password || typeof password !== "string") {
        return res.status(400).json({ message: "Password is required." });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { username, email, password } = req.body;

    const identifier = username || email;
    if (!identifier || typeof identifier !== "string" || identifier.trim() === "") {
        return res.status(400).json({ message: "Username or Email is required." });
    }

    if (!password || typeof password !== "string" || password.trim() === "") {
        return res.status(400).json({ message: "Password is required." });
    }

    next();
};

module.exports = {
    validateRegister,
    validateLogin
};
