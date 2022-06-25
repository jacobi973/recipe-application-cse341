const user = require('../controller/user.js');
const routes = require('express').Router();

routes.get("/delete", function(req, res, next){
  if (!req.user) {
      res.redirect('/auth/home');
    } else {
      next();
    }
}, user.delete);

routes.get("/update", (req, res) => {
  if (!req.user) {
    res.redirect('/auth/home');
  } else {
    res.render('update', {
      user: req.user,
      message: null
    })
  }
});

routes.post("/updateUser", user.update);

module.exports = routes;