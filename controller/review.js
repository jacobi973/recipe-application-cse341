const Review = require('../model/schemas').Reviews;
// eslint-disable-next-line no-unused-vars
const ObjectId = require('mongodb').ObjectId;

exports.create = (req, res) => {
    // Create a Review based on recipe_id, and user_id
    console.log(req.params.recipe_id)
    const review = new Review({
      recipeId: req.params.recipe_id,
      userId: req.user.googleId,
      review: req.body.review,
      rating: req.body.rating
    });
    review
      .save(review)
      .then((data) => {
        console.log(data);
        res.send('Your Review was successfully posted!');
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating your review'
        });
      });
  };

//GET ALL reviews
exports.findAll = (req, res) => {
    Review.find({})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving reviews.'
        });
      });
  };