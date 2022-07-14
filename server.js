const express = require('express');
const app = express();
// eslint-disable-next-line no-unused-vars
const passportSetup = require('./controller/user');
const sessions = require('express-session');
const passport = require('passport');
require('dotenv').config();
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
app.use(express.json({
    extensions: false
}));

// set up routes
app.use('/', require('./routes/index'));

module.exports = app;