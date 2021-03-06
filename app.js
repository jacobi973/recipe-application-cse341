const express = require('express');
const connectDB = require('./controller/dbConnection');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
// eslint-disable-next-line no-unused-vars
const passportSetup = require('./controller/user');
const authRoutes = require('./routes/auth-routes');
// const userRoutes = require('./routes/user-routes');
const swaggerDocument = require('./swagger.json');
const sessions = require('express-session');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000;

  var options = {
    customCssUrl: '/custom.css'
  };

// set view engine
app.set('view engine', 'ejs');
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
// set up session cookies
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
app.use(express.json({
    extensions: false
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
// set up routes
app.use('/auth', authRoutes);
app.use('/', require('./routes/index'));
app.use('/api-docs', function(req, res, next){
    if (!req.user) {
        res.redirect('/auth/home');
      } else {
        next();
      }
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Running on port ${port}`)
});

connectDB();
