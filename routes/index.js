const routes = require('express').Router();
const recipeRoutes = require('./recipe-routes.js');
const reviewRoutes = require('./review-routes.js');
const listRoutes = require('./list-routes.js');

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/home');
  } else {
    next();
  }
};

routes.get('/', authCheck, (req, res) => {
  res.render('home', {
    user: req.user
  });

});

routes.use('/recipes', recipeRoutes);
routes.use('/reviews', reviewRoutes);
routes.use('/lists', listRoutes);

module.exports = routes;