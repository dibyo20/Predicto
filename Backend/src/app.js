const express = require('express');
const app = express();
const authRouter = require('./routes/auth.routes.js');
const uploadRouter = require('./routes/song.routes.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/songs', uploadRouter);

module.exports = app;