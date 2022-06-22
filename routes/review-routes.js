const routes = require('express').Router();
const reviews = require('../controller/review.js');
const validation = require('../validation');

// Create a new recipe
routes.post('/:recipe_id/:user_id', validation.addNewReview, reviews.create);
// Retrieve all recipes by user posted
//routes.get('/userPosted/:userPostedId', recipes.findByUserPosted);

// Retrieve a single recipe with id
//routes.get('/:recipe_id', recipes.findOne);

// GET ALL REVIEWS
routes.get('/', reviews.findAll);

// Update a recipe with id
//routes.put('/:id', validation.updateOneRecipe, recipes.update);

// Delete a recipe with id
//routes.delete('/:id', recipes.delete);

module.exports = routes;