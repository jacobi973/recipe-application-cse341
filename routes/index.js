const routes = require('express').Router();
const recipeRoutes = require('./recipe-routes.js');
const reviewRoutes = require('./review-routes.js');
const listRoutes = require('./list-routes.js');
const userRoutes = require('./user-routes.js');


const authCheck = (req, res, next) => {
  const apikey = req.get('apikey');
  if (!req.user && apikey !== process.env.apikey) {
    res.redirect('/auth/home');
  } else {
      
    next();
  }
};


routes.get('/',
  // #swagger.ignore = true
  authCheck, (req, res) => {
    res.render('home', {
      user: req.user
    });

  });


routes.use('/recipes', recipeRoutes);
routes.use('/reviews', reviewRoutes);
routes.use('/lists', listRoutes);
routes.use('/user',  userRoutes);


module.exports = routes;