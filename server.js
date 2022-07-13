const express = require('express');
const app = express();

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