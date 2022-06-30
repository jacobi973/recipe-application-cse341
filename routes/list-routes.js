const routes = require('express').Router();
const list = require('../controller/list');
const validation = require('../validation');

// Create a new list
routes.post('/', validation.addNewList, list.create
    // #swagger.tags = ['List']
);

// Retrieve all lists by user id
routes.get('/user/:user_id', list.findByUser
    // #swagger.tags = ['List']
);

// Retrieve a single list with list id
routes.get('/:list_id', list.findOne
    // #swagger.tags = ['List']
);

// Retrive all lists in database
routes.get('/', list.findAll
    // #swagger.tags = ['List']
);

// Update a list with id
routes.put('/:id', validation.updateOneList, list.update
    // #swagger.tags = ['List']
);

// Delete a list with id
routes.delete('/:id', list.delete
    // #swagger.tags = ['List']
);

module.exports = routes;