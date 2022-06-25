const routes = require('express').Router();
const recipes = require('../controller/recipe');
const validation = require('../validation');

// Create a new recipe
routes.post('/', validation.addNewRecipe, recipes.create);

// Retrieve all recipes by key words
routes.get('/keywords', recipes.findByKeyWords);

// Retrieve all recipes by user posted
routes.get('/userPosted/:userPostedId', recipes.findByUserPosted);

// Retrieve a single recipe with id
routes.get('/:recipe_id', recipes.findOne);

// Retrive all recipes in database
routes.get('/', recipes.findAll);

// Update a recipe with id
routes.put('/:id', validation.updateOneRecipe, recipes.update);

// Delete a recipe with id
routes.delete('/:id', recipes.delete);

module.exports = routes;