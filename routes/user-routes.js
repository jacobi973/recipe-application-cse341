const user = require('../controller/user.js');
const routes = require('express').Router();

const authCheck = (req, res, next) => {
  const apikey = req.get('apikey');
  if (!req.user && apikey !== process.env.apikey) {
    res.redirect('/auth/home');
  } else {

    next();
  }
};



routes.post('/', authCheck, user.create
  // #swagger.tags = ['User']
  // #swagger.summary = "Create a new user"
  // #swagger.description = 'This method updates creates a user. This is for documentation purposes only. All creations will go through the frontend.'
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Submit a user',
      schema: {
          googleId: '123456789',
          username: "user",
      }
  }*/
);

// Retrive user in database
routes.get('/', authCheck, user.findOne
  // #swagger.tags = ['User']
  // #swagger.summary = "Get your user information"
);

  routes.post("/updateUser",
  /*  #swagger.auto = false
      #swagger.tags = ['User']
      #swagger.summary = "Update a user"
      #swagger.path = '/users/{id}'
      #swagger.method = 'put'
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

  // This sections is for the frontend part of the app
routes.get("/delete",
/*  #swagger.auto = false
    #swagger.tags = ['User']
    #swagger.summary = "Delete a user"
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

module.exports = routes;