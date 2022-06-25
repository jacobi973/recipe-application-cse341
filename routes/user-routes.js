const user = require('../controller/user.js');
const routes = require('express').Router();

routes.get("/delete", user.delete);

routes.get("/update", (req, res) => {
    res.render('update', { user: req.user })
  });

routes.post("/updateUser", user.update);

module.exports = routes;