const validator = require('./validate');

const addNewRecipe = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    ingredients: 'required|array',
    instructions: 'required|array',
    imageLink: 'string',
    userPosted: 'required|string',
    keyWords: 'required|array'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const updateOneRecipe = (req, res, next) => {
  const validationRule = {
    name: 'string',
    ingredients: 'array',
    instructions: 'array',
    imageLink: 'array',
    userPosted: 'string',
    keywords: 'array'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
const addNewReview = (req, res, next) => {
  const validationRule = {
    recipeId: 'string',
    userId: 'string',
    review: 'required|string',
    rating: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
module.exports = {
  addNewReview,
  addNewRecipe,
  updateOneRecipe
};
