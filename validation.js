const validator = require('./validate');

//validation for creating a new recipe
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

//validation for updating a recipe
const updateOneRecipe = (req, res, next) => {
  const validationRule = {
    name: 'string',
    ingredients: 'array',
    instructions: 'array',
    imageLink: 'string',
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

//validation for creating a new list
const addNewList = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    items: 'required|array',
    userId: 'required|string'
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

//validation for updating a list
const updateOneList = (req, res, next) => {
  const validationRule = {
    title: 'string',
    items: 'array',
    userId: 'string'
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

//validation for creating a new review
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
//validation for updating a recipe
const updateOneReview= (req, res, next) => {
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
  updateOneReview,
  addNewRecipe,
  updateOneRecipe,
  addNewList,
  updateOneList
};
