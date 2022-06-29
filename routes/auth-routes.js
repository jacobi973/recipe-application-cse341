const passport = require('passport');
const routes = require('express').Router();

// auth login
routes.get('/home', (req, res) => {
    res.render('home', { user: req.user });
});

// auth logout
routes.get("/logout", (req, res, next) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/");
    });
  });

// auth with google+
routes.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));


routes.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});



module.exports = routes;