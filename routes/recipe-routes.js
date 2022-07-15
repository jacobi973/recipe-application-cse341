const routes = require('express').Router();
const recipes = require('../controller/recipe');
const validation = require('../validation');

const authCheck = (req, res, next) => {
    const apikey = req.get('apikey');
    if (!req.user && apikey !== process.env.apikey) {
      res.redirect('/auth/home');
    } else {
        
      next();
    }
  };

  
// Create a new recipe
routes.post('/', authCheck, validation.addNewRecipe, recipes.create
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
            $keyWords: ['cream cheese', 'cherry']
        }
    }*/
);


// Retrieve all recipes by user posted
routes.get('/userPosted/:userPosted', authCheck, recipes.findByUserPosted
   // #swagger.tags = ['Recipes']
   // #swagger.summary = 'Get recipes posted by certain user'
);

// Retrieve all recipes by key words
routes.get('/keyWords', authCheck, recipes.findByKeywords
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Find recipes using keyword'
);

// Retrieve all recipes by ingredients
routes.get('/ingredients', authCheck, recipes.findByIngredients
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Find recipes using ingredients'
);



// Retrieve a single recipe with id
routes.get('/:recipe_id', authCheck, recipes.findOne
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get recipe by recipe ID'
);

// Retrieve all recipes in database
routes.get('/', recipes.findAll, authCheck
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get all recipes from database'
);

// Update a recipe with id
routes.put('/:id', authCheck, validation.updateOneRecipe, recipes.update
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Update recipe using ID'
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Make updates to recipe using recipe ID',
        example: '62b7adea95fbc1ad13b8f808', 
        schema: {
            $name: 'Pizza Pie',
            $ingredients: ['pizza crust', 'cheese', 'sauce', 'pepperoni'],
            $instructions: ['Spread sauce on crust', 'Sprinkle cheese on top', 'Top with pepperoni', 'Bake at 400F for 12 min'],
            $imageLink: 'https://unsplash.com/photos/MQUqbmszGGM',
            $userPosted: '104358594858321533678',
            $keyWords: ['pizza', 'cheese', 'pepperoni']
        }
    }*/
);

// Delete a recipe with id
routes.delete('/:id', authCheck, recipes.delete
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Delete recipe using ID'
);

module.exports = routes;