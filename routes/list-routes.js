const routes = require('express').Router();
const list = require('../controller/list');
const validation = require('../validation');

const authCheck = (req, res, next) => {
    const apikey = req.get('apikey');
    if (!req.user && apikey !== process.env.apikey) {
      res.redirect('/auth/home');
    } else {
        
      next();
    }
  };


// Create a new list
routes.post('/', authCheck, validation.addNewList, list.create
    // #swagger.tags = ['List']
    // #swagger.summary = 'Make a new shopping list'
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Allows user to create new shopping list',
        schema: {
            $title: 'Grocery List 1',
            $items: ['bread', 'milk', 'butter', 'sugar'],
            $userId: '62b22dbe5361f5388a5c5d87'
        }
    }*/
);

// Retrieve all lists by user id
routes.get('/user/:user_id', authCheck, list.findByUser
    // #swagger.tags = ['List']
    // #swagger.summary = 'Get all lists created by user'
);

// Retrieve a single list with list id
routes.get('/:list_id', authCheck, list.findOne
    // #swagger.tags = ['List']
    // #swagger.summary = 'Retrieve single list by ID'
);

// Retrive all lists in database
routes.get('/', authCheck, list.findAll
    // #swagger.tags = ['List']
    // #swagger.summary = 'Get all shopping lists for everyone'
);

// Update a list with id
routes.put('/:id', authCheck, validation.updateOneList, list.update
    // #swagger.tags = ['List']
    // #swagger.summary = 'Update shopping list by list ID'
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Allows user to update existing shopping list',
        schema: {
            $title: 'Updated Grocery List',
            $items: ['bread', 'milk', 'butter', 'sugar', 'updated additional item'],
            $userId: '62b22dbe5361f5388a5c5d87'
        }
    }*/
);

// Delete a list with id
routes.delete('/:id', authCheck, list.delete
    // #swagger.tags = ['List']
    // #swagger.summary = 'Delete shopping list by list ID'
);

module.exports = routes;