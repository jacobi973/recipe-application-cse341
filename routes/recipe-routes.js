const routes = require('express').Router();
const recipes = require('../controller/recipe');
const validation = require('../validation');

// Create a new recipe
routes.post('/', validation.addNewRecipe, recipes.create
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Add a recipe to the database'
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Submit a recipe',
        schema: {
            $name: 'Cherry Cheesecake',
            $ingredients: ['1 lb cream cheese', '1 cup sugar', '2 eggs', '1 can cherry pie filling'],
            $instructions: ['Beat cream cheese and sugar together until smooth', 'Beat in eggs until smooth', 'Bake at 350F for 45 minutes', 'Spread cherry filling on top'],
            $imageLink: 'https://unsplash.com/photos/_BBTqanOrBI',
            $userPosted: '62b0d6fc3620510a74d6ecba',
            $keyWords: ['cream cheese', 'cherry']
        }
    }*/
);

// Retrieve all recipes by key words
routes.get('/keywords', recipes.findByKeyWords
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Find a recipe using keyword'
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Use keyword to find recipe',
        schema: {
            $keyWords: 'cookie'
        }
    }*/
);

// Retrieve all recipes by user posted
routes.get('/userPosted/:userPostedId', recipes.findByUserPosted
   // #swagger.tags = ['Recipes']
);

// Retrieve a single recipe with id
routes.get('/:recipe_id', recipes.findOne
    // #swagger.tags = ['Recipes']
);

// Retrive all recipes in database
routes.get('/', recipes.findAll
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get all recipes from database'
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Retrieve all recipes'
    }*/
);

// Update a recipe with id
routes.put('/:id', validation.updateOneRecipe, recipes.update
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get recipe using ID'
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Use ID to find recipe'
    }*/
);

// Delete a recipe with id
routes.delete('/:id', recipes.delete
    // #swagger.tags = ['Recipes']
);

module.exports = routes;