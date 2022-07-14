const user = require('../controller/user.js');
const routes = require('express').Router();

const authCheck = (req, res, next) => {
  const apikey = req.get('apikey');
  if (!req.user && apikey !== process.env.apikey) {
      console.log('apiKey',apikey);
    res.redirect('/auth/home');
  } else {
      
    next();
  }
};


// This sections is for the frontend part of the app
routes.get("/delete",
  /*  #swagger.auto = false
      #swagger.tags = ['User']
      #swagger.path = '/users/{id}'
      #swagger.method = 'delete'
      #swagger.produces = ['application/json']
      #swagger.consumes = ['application/json']
      #swagger.description = 'This method deletes a user. This is for documentation purposes only. All deletes will go through the frontend.'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'User ID.',
          required: true,
          type: 'string'
      }
      }
  */

  authCheck, user.delete);

routes.get("/update",
  // #swagger.ignore = true
  authCheck, (req, res) => {
    res.render('update', {
      user: req.user,
      message: null
    });
  });

routes.post("/updateUser",
  /*  #swagger.auto = false
      #swagger.tags = ['User']
      #swagger.path = '/users/{id}'
      #swagger.method = 'post'
      #swagger.description = 'This method updates user information. The current fields are: username, and dob. The new values are passed in the body of the request. This is for documentation purposes only. All updates will go through the frontend.'

      #swagger.parameters['id'] = {
          in: 'path',
          description: 'User ID.',
          required: true,
          type: 'string'
      }
     #swagger.parameters['obj'] = {
           in: 'body',
            description: 'User data.',
            required: true,
            schema: {
                  username: "user",
                  dob: "1234"
        }
      }
  */
      authCheck,
  user.update);

  // Retrive user in database
routes.get('/', authCheck, user.findOne
// #swagger.tags = ['User']
);


module.exports = routes;