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

// Create a new Review for a recipe
routes.post(`/:recipe_id`, authCheck, validation.addNewReview, reviews.create
    // #swagger.tags = ['Reviews']
    // #swagger.summary = 'Add a Review to a recipe'
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Submit a review',
        schema: {
            $review: 'Best cheesecake I've ever had!',
            $rating: '4',
        }
    }*/
);
// Retrieve all recipes by user posted
//routes.get('/userPosted/:userPostedId', recipes.findByUserPosted);

// Retrieve a single recipe with id
//routes.get('/:recipe_id', recipes.findOne);

// GET ONE REVIEW OF RECIPE 
routes.get('/recipe/:recipe_id', authCheck, reviews.findReviewByRecipe
    // #swagger.tags = ['Reviews']
    // #swagger.description = 'Get A Reviews for a Recipe'
    /* #swagger.parameters['recipe_id'] = {
        in: 'path',
        description: 'Input recipe ID',
        required: true,
        type: 'string'
    }*/
);
//GET ALL REVIEWS
routes.get('/', reviews.findAll
    // #swagger.tags = ['Reviews']
    // #swagger.summary = 'Get all Reviews'
);
// Update a review with id
routes.put('/:id', validation.updateOneReview, reviews.update
 // #swagger.tags = ['Reviews']
    // #swagger.summary = 'Update one review using review ID'
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Make updates to a review using review ID',
        example: '62b7adea95fbc1ad13b8f808', 
        schema: {
            $review: '2nd greatest cheescake I've ever had',
            $rating: '3',
        }
    }*/);
// Retrieve a single review with id
routes.get('/:id', authCheck,  reviews.findOne
    // #swagger.tags = ['Reviews']
    // #swagger.summary = 'Get one review by review ID'
    /* swagger.parameters
    */
);
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