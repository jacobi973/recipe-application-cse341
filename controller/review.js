const Review = require('../model/schemas').Reviews;
// eslint-disable-next-line no-unused-vars
const ObjectId = require('mongodb').ObjectId;

exports.create = (req, res) => {
  if (!ObjectId.isValid(req.params.recipe_id)) {
    console.log(req.params.recipe_id)
    res.status(400).json({
      message: 'A valid id is needed to update review'
    });
  }
    // Create a Review based on recipe_id, and user_id
    const review = new Review({
      recipeId: req.params.recipe_id,
      userId: req.user.googleId,
      review: req.body.review,
      rating: req.body.rating
    });
    review
      .save(review)
      .then((data) => {
        res.send('Your Review was successfully posted!');
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating your review'
        });
      });
  };
//GET ALL reviews for a given recipe
exports.findReviewByRecipe = (req, res) => {
  if (!ObjectId.isValid(req.params.recipe_id)) {
    console.log(req.params.recipe_id)
    res.status(400).json({
      message: 'A valid recipe id is needed to find reviews'
    });
  }
  const recipeId = req.params.recipe_id;
  Review.find({ recipeId: recipeId })
  .then((data) => {
    if (!data) {
      res.status(404).send({ message: `No reviews for that recipe were found! Try adding one!` });
    } else {
      res.send(data);
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: `Error retrieving reviews with recipe id of  ${recipeId}`
    });
    console.log(err);
  });
};
// Update review by id
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
    const review = {
      recipeId: req.params.recipe_id,
      userId: req.user.googleId,
      review: req.body.review,
      rating: req.body.rating
    };
    

    Review.findByIdAndUpdate(id, review, { useFindAndModify: false })
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


exports.delete = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: 'A valid id is needed to delete recipe'
    });
  } else {
    const id = req.params.id;

    Review.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete review with id=${id}!`
          });
        } else {
          res.send({
            message: 'Review was deleted successfully!'
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Could not delete Review with id=' + id
        });
        console.log(err);
      });
  }
  };