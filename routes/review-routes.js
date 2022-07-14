const routes = require('express').Router();
const reviews = require('../controller/review.js');
const validation = require('../validation');

const authCheck = (req, res, next) => {
    const apikey = req.get('apikey');
    if (!req.user && apikey !== process.env.apikey) {
        console.log('apiKey',apikey);
      res.redirect('/auth/home');
    } else {
        console.log('authCheck', apikey);
      next();
    }
  };

// Create a new review
routes.post(`/:recipe_id`, authCheck, validation.addNewReview, reviews.create
    // #swagger.tags = ['Reviews']
    // #swagger.description = 'Add a review'
);
// Retrieve all recipes by user posted
//routes.get('/userPosted/:userPostedId', recipes.findByUserPosted);

// Retrieve a single recipe with id
//routes.get('/:recipe_id', recipes.findOne);

// GET ALL REVIEWS for specified recipe
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

// Update a review with using review id
routes.put('/:id', authCheck, validation.updateOneReview, reviews.update
// #swagger.tags = ['Reviews']
    // #swagger.description = 'Update a Review'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Input review ID',
        required: true,
        type: 'string'
    }*/);

// Delete a review using review id
routes.delete('/:id', authCheck, reviews.delete
// #swagger.tags = ['Reviews']
    // #swagger.description = 'Delete a review'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Input review ID',
        required: true,
        type: 'string'
    }*/);

module.exports = routes;