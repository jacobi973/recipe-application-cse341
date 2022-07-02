const Review = require('../model/schemas').Reviews;
// eslint-disable-next-line no-unused-vars
const ObjectId = require('mongodb').ObjectId;

exports.create = (req, res) => {
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
      Review.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update review with id=${id}!`
            });
          } else res.send({ message: 'review was updated successfully.' });
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Error updating review with id=' + id
          });
          console.log(err);
        });
    }
  };


exports.delete = (req, res, next) => {
    if (!ObjectId.isValid(req.user._id)) {
      res.status(400).json({
        message: 'A valid id is needed to delete review'
      });
    } else {
      const id = req.user._id;
  
      User.findByIdAndRemove(id)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot delete review with id=${id}`
            });
          } else {
            req.logout(req.user, err => {
                if(err) return next(err);
                res.render("deleted");
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