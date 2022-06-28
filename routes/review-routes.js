const routes = require('express').Router();
const reviews = require('../controller/review.js');
const validation = require('../validation');

// Create a new recipe
routes.post('/:recipe_id/:user_id', validation.addNewReview, reviews.create
    // #swagger.tags = ['Reviews']
    // #swagger.description = 'Add a review'
);
// Retrieve all recipes by user posted
//routes.get('/userPosted/:userPostedId', recipes.findByUserPosted);

// Retrieve a single recipe with id
//routes.get('/:recipe_id', recipes.findOne);

// GET ALL REVIEWS
routes.get('/', reviews.findAll
    // #swagger.tags = ['Reviews']
    // #swagger.description = 'Get all reviews'
    /* #swagger.parameters['recipe_id'] = {
        in: 'path',
        description: 'Input recipe ID',
        required: true,
        type: 'string'
    }*/
);

// Update a recipe with id
//routes.put('/:id', validation.updateOneRecipe, recipes.update);

// Delete a recipe with id
//routes.delete('/:id', recipes.delete);

module.exports = routes;