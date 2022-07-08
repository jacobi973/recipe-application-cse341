const routes = require('express').Router();
const reviews = require('../controller/review.js');
const validation = require('../validation');

const authCheck = (req, res, next) => {
    if (!req.user) {
      res.redirect('/auth/home');
    } else {
      next();
    }
  };

// Create a new recipe
routes.post(`/:recipe_id`, authCheck, validation.addNewReview, reviews.create
    // #swagger.tags = ['Reviews']
    // #swagger.description = 'Add a review'
);
// Retrieve all recipes by user posted
//routes.get('/userPosted/:userPostedId', recipes.findByUserPosted);

// Retrieve a single recipe with id
//routes.get('/:recipe_id', recipes.findOne);

// GET ALL REVIEWS
routes.get('/:recipe_id', authCheck, reviews.findReviewByRecipe
    // #swagger.tags = ['Reviews']
    // #swagger.description = 'Get A Reviews for a Recipe'
    /* #swagger.parameters['recipe_id'] = {
        in: 'path',
        description: 'Input recipe ID',
        required: true,
        type: 'string'
    }*/
);

// Update a review with id
routes.put('/:id', validation.updateOneReview, reviews.update
// #swagger.tags = ['Reviews']
    // #swagger.description = 'Update a Review'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Input review ID',
        required: true,
        type: 'string'
    }*/);

// Delete a recipe with id
routes.delete('/:id', reviews.delete
// #swagger.tags = ['Reviews']
    // #swagger.description = 'Delete a review'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Input review ID',
        required: true,
        type: 'string'
    }*/);

module.exports = routes;