const routes = require('express').Router();
const recipes = require('../controller/recipe');
const validation = require('../validation');

// Create a new recipe
routes.post('/', validation.addNewRecipe, recipes.create
    // #swagger.tags = ['Recipes']
);

// Retrieve all recipes by key words
routes.get('/keywords', recipes.findByKeyWords
    // #swagger.tags = ['Recipes']
);

// Retrieve all recipes by ingredients
routes.get('/ingredients', recipes.findByIngredients
    // #swagger.tags = ['Recipes']
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
);

// Update a recipe with id
routes.put('/:id', validation.updateOneRecipe, recipes.update
    // #swagger.tags = ['Recipes']
);

// Delete a recipe with id
routes.delete('/:id', recipes.delete
    // #swagger.tags = ['Recipes']
);

module.exports = routes;