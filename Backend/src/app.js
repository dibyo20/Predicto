const express = require('express');
const app = express();
const authRouter = require('./routes/auth.routes.js');
const uploadRouter = require('./routes/upload.routes.js');
const cookieParser = require('cookie-parser');

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/api', uploadRouter);

module.exports = app;