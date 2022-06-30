const routes = require('express').Router();
const recipes = require('../controller/recipe');
const validation = require('../validation');

const authCheck = (req, res, next) => {
    if (!req.user) {
      res.redirect('/auth/home');
    } else {
      next();
    }
  };

// Create a new recipe
routes.post('/',authCheck, validation.addNewRecipe, recipes.create
    // #swagger.tags = ['Recipes']
);

// Retrieve all recipes by key words
routes.get('/keywords', authCheck, recipes.findByKeyWords
    // #swagger.tags = ['Recipes']
);

// Retrieve all recipes by ingredients
routes.get('/ingredients', recipes.findByIngredients
    // #swagger.tags = ['Recipes']
);

// Retrieve all recipes by user posted
routes.get('/userPosted/:userPostedId', authCheck, recipes.findByUserPosted
    // #swagger.tags = ['Recipes']
);

// Retrieve a single recipe with id
routes.get('/:recipe_id', authCheck, recipes.findOne
    // #swagger.tags = ['Recipes']
);

// Retrive all recipes in database
routes.get('/', authCheck, recipes.findAll
    // #swagger.tags = ['Recipes']
);

// Update a recipe with id
routes.put('/:id', authCheck, validation.updateOneRecipe, recipes.update
    // #swagger.tags = ['Recipes']
);

// Delete a recipe with id
routes.delete('/:id', authCheck, recipes.delete
    // #swagger.tags = ['Recipes']
);

module.exports = routes;