//const routes = require('express').Router();
// eslint-disable-next-line no-unused-vars

const Recipe = require('../model/schemas').Recipe;
const ObjectId = require('mongodb').ObjectId;

exports.create = (req, res) => {

  if (!ObjectId.isValid(req.body.userPosted)) {
    res.status(400).json({
      message: 'A valid user id is needed to post a recipe'
    });
  } else {

    // Create a Recipe
    let _id = ''
    if (req.body._id) {
      _id = req.body._id
    } else {
      _id = new ObjectId()
    }
      const recipe = new Recipe({
        _id: _id,
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageLink: req.body.imageLink,
        date: Date.now(),
        userPosted: req.body.userPosted,
        keyWords: req.body.keyWords
      });
    

    // Save Recipe in the database
    recipe
      .save(recipe)
      .then(() => {
        //req.session.message = 'Your Recipe was successfully posted!';
        res.send('Your Recipe was successfully posted!');
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the Recipe.'
        });
      });
  }
}


exports.findAll = (req, res) => {
    Recipe.find({})
      .then((data) => {
        //console.log(data);
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving recipes.'
        });
      });
  };


//Find by key words
//http://localhost:3000/recipes/keyWords/?keyWords[]=mash
//http://localhost:3000/recipes/keyWords/?keyWords[]=cookie 
//http://localhost:3000/recipes/keyWords/?keyWords[]=mash&keyWords[]=cookie
exports.findByKeywords = (req, res) => {
    if (!req.query.keyWords) {
      res.status(400).json({
        message: 'A valid key word is needed to retrive recipes'
      });
    } else {
      let keyWords = req.query.keyWords;
      
      //swagger sends keywords as a string so I have to put it into an array
      if (!Array.isArray(keyWords)) {
        keyWords = keyWords.split(/[, ]+/)
      }

      // strip each word of any character that is not a number or letter
      let strippedKeyWords = [];
      keyWords.forEach((word) => {
        strippedKeyWords.push(word.replace(/[^a-z0-9]/gi, ''))
      })

      const orArray = strippedKeyWords.map((searchValue) => {
        return {
            keyWords: searchValue,
        }
      });
      Recipe.aggregate([{
        $match: { $or: orArray }
      }])
        .then((data) => {
          if (!data || data.length === 0) {
            res.status(404).send({ message: `Not found. Recipe with key word(s) ${keyWords}. Try checking your spelling or using different words` });
          } else {
            res.send(data);
            //res.render('recipes', { recipes: data, user: req.session.user });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: `Error retrieving recipe with key word ${keyWords}`
          });
          console.log(err);
        });
    }
  };

    //http://localhost:3000/recipes/ingredients/?ingredients[]=salt&ingredients[]=jelly
    exports.findByIngredients = (req, res) => {
      if (!req.query.ingredients) {
        res.status(400).json({
          message: 'Valid ingredient(s) is needed to retrive recipes'
        });
      } else {
        let ingredients = req.query.ingredients;
        
        //swagger sends ingredients as a string so I have to put it into an array
        if (!Array.isArray(ingredients)) {
          ingredients = ingredients.split(/[, ]+/)
        }

        // strip each word of any character that is not a number or letter
        let strippedIngredients = [];
        ingredients.forEach((word) => {
          strippedIngredients.push(word.replace(/[^a-z0-9]/gi, ''))
        })
  
        const orArray = strippedIngredients.map((searchValue) => {
          return {
              ingredients: { $regex: searchValue, $options: "i" }
          }
        });
        Recipe.aggregate([{
          $match: { $or: orArray }
        }])
          .then((data) => {
            if (!data || data.length === 0) {
              res.status(404).send({ message: `Not found. Recipe with ingredient(s) ${ingredients}. Try checking your spelling` });
            } else {
              res.send(data);
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: `Error retrieving recipe with ingredient(s) ${ingredients}`
            });
            console.log(err);
          });
      }
    };


// Find a single Recipe with an id
exports.findOne = (req, res) => {
  if (!ObjectId.isValid(req.params.recipe_id)) {
    res.status(400).json({
      message: 'A valid recipe id is needed to retrive a recipe'
    });
  } else {
    const recipe_id = req.params.recipe_id;
    Recipe.find({ _id: recipe_id })
      .then((data) => {
        if (!data[0]) {
          res.status(404).send({ message: 'Not found recipe with id ' + recipe_id });
        } else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving recipe with recipe_id =' + recipe_id
        });
        console.log(err);
      });
  }
};



// Find all recipes a specific user posted based on their id 
//http://localhost:3000/recipes/userPosted/62b0d6fc3620510a74d6ecba
//http://localhost:3000/recipes/userPosted/62b22dbe5361f5388a5c5d87
exports.findByUserPosted = (req, res) => {
    if (!ObjectId.isValid(req.params.userPostedId)) {
      res.status(400).json({
        message: 'A valid user id is needed to retrive recipes'
      });
    } else {
      const userPosted = req.params.userPostedId;
      Recipe.find({ userPosted: userPosted })
        .then((data) => {
          if (!data || data.length === 0) {
            res.status(404).send({ message: `Not found. Recipes posted by user with id  of ${userPosted}. Maybe user does not have any posts` });
          } else {
            res.send(data);
            //res.render('recipes', { recipes: data, user: req.session.user });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: `Error retrieving recipes with user id ${userPosted}`
          });
          console.log(err);
        });
    }
  };



// Update an recipe by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data to update can not be empty!'
      });
    } else if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        message: 'A valid id is needed to update recipe'
      });
    } else {
      const id = req.params.id;
  
      Recipe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update recipe with id=${id}. Maybe recipe was not found!`
            });
          } else res.send({ message: 'Recipe was updated successfully.' });
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Error updating recipe with id=' + id
          });
          console.log(err);
        });
    }
  };



// Delete a recipe with the specified id in the request
exports.delete = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        message: 'A valid id is needed to delete recipe'
      });
    } else {
      const id = req.params.id;
  
      Recipe.findByIdAndRemove(id)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot delete recipe with id=${id}. Maybe recipe was not found!`
            });
          } else {
            res.send({
              message: 'Recipe was deleted successfully!'
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Could not delete recipe with id=' + id
          });
          console.log(err);
        });
    }
  };


//module.exports = routes;