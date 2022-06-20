const routes = require('express').Router();

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

routes.use('/recipe', require('../controller/recipe'));
routes.use('/review', require('../controller/review'));
routes.use('/list', require('../controller/list'));
module.exports = routes;