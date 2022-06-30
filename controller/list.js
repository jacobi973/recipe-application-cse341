//const routes = require('express').Router();
// eslint-disable-next-line no-unused-vars

const List = require('../model/schemas').List;
const ObjectId = require('mongodb').ObjectId;

exports.create = (req, res) => {
  // Create a List
  const list = new List({
    title: req.body.title,
    items: req.body.items,
    date: Date.now(),
    userId: req.body.userId
  });

  // Save List in the database
  list
    .save(list)
    .then((data) => {
      console.log(data);
      //req.session.message = 'Your Recipe was successfully posted!';
      res.send('Your List was successfully posted!');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the list.'
      });
    });
};


exports.findByUser = (req, res) => {
    if (!req.params.user_id) {
      res.status(400).json({
        message: 'A valid user id is needed to retrive lists'
      });
    } else {
      const userId = req.params.user_id;
      List.find({ userId: userId })
        .then((data) => {
          if (!data) {
            res.status(404).send({ message: `Not found. Lists posted by user with id  of ${userId}. Maybe user does not have any posts` });
          } else {
            res.send(data);
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: `Error retrieving lists with user id ${userId}`
          });
          console.log(err);
        });
    }
  };


// Find a single List with a list id
exports.findOne = (req, res) => {
    if (!ObjectId.isValid(req.params.list_id)) {
      res.status(400).json({
        message: 'A valid id is needed to retrive a list '
      });
    } else {
      const listId = req.params.list_id;
      List.find({ _id: listId })
        .then((data) => {
          if (!data[0]) {
            res.status(404).send({ message: 'Not found list with id ' + listId });
          } else res.send(data[0]);
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Error retrieving list with list id =' + listId
          });
          console.log(err);
        });
    }
  };


  exports.findAll = (req, res) => {
    List.find({})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving lists.'
        });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data to update can not be empty!'
      });
    } else if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        message: 'A valid id is needed to update list'
      });
    } else {
      const id = req.params.id;
  
      List.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update list with id=${id}. Maybe list was not found!`
            });
          } else res.send({ message: 'List was updated successfully.' });
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Error updating list with id=' + id
          });
          console.log(err);
        });
    }
  };


  // Delete a recipe with the specified id in the request
exports.delete = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        message: 'A valid id is needed to delete list'
      });
    } else {
      const id = req.params.id;
  
      List.findByIdAndRemove(id)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot delete list with id=${id}. Maybe list was not found!`
            });
          } else {
            res.send({
              message: 'List was deleted successfully!'
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Could not delete list with id=' + id
          });
          console.log(err);
        });
    }
  };


//module.exports = routes;