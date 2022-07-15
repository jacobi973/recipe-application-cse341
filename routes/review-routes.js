const routes = require('express').Router();
const reviews = require('../controller/review.js');
const validation = require('../validation');

const authCheck = (req, res, next) => {
    const apikey = req.get('apikey');
    if (!req.user && apikey !== process.env.apikey) {
        res.redirect('/auth/home');
    } else {

        next();
    }
};

// Create a new Review for a recipe
routes.post(`/:recipe_id`, authCheck, validation.addNewReview, reviews.create
    // #swagger.tags = ['Reviews']
    // #swagger.description = 'Add a review'
    // #swagger.summary = 'Add a review'
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Post a Review for a recipe',
        schema: {
            $review: 'Review goes here',
            $rating: '5'
        }
    }*/
);




//GET ALL REVIEWS
routes.get('/', reviews.findAll
    // #swagger.tags = ['Reviews']
    // #swagger.summary = 'Get all Reviews'
);


// GET ONE REVIEW OF RECIPE 
routes.get('/review/:recipe_id', authCheck, reviews.findReviewByRecipe
    // #swagger.tags = ['Reviews']
    // #swagger.description = 'Get A Reviews for a Recipe'
    /* #swagger.parameters['recipe_id'] = {
        in: 'path',
        description: 'Input recipe ID',
        required: true,
        type: 'string'
    }*/
);

// Retrieve a single review with id
routes.get('/:id', authCheck, reviews.findOne
    // #swagger.tags = ['Reviews']
    // #swagger.summary = 'Get one review by review ID'
    /* swagger.parameters
     */
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
    }*/
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Update Receipe',
        schema: {
            $review: 'Review goes here',
            $rating: '5'
        }
    }*/
);


// Delete a review using review id
routes.delete('/:id', authCheck, reviews.delete
    // #swagger.tags = ['Reviews']
    // #swagger.description = 'Delete a review'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Input review ID',
        required: true,
        type: 'string'
    }*/
);

module.exports = routes;