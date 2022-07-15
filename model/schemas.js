const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

// Recipe schema
const recipe = new mongoose.Schema({
    _id: ObjectId,
    name: {
        type: String,
        required: true
    },
    ingredients: [String],
    instructions: [String],
    imageLink: String,
    date: {
        type: Date,
        default: Date.now()
    },
    userPosted: String,
    keyWords: [String]
}, {
    collection: 'recipes'
});
const Recipe = mongoose.model('recipe', recipe)

// List schema
const list = new mongoose.Schema({
    _id: ObjectId,
    title: {
        type: String,
        required: true
    },
    items: [String],
    date: {
        type: Date,
        default: Date.now()
    },
    userId: String
}, {
    collection: 'list'
});
const List = mongoose.model('list', list)


// Reviews schema
const reviews = new mongoose.Schema({
    _id: ObjectId,
    recipeId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    }
}, {
    collection: 'reviews'
});
const Review = mongoose.model('reviews', reviews)

// User schema
const userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    thumbnail: String,
    dob: String
}, {
    collection: 'users'
});
const User = mongoose.model('user', userSchema);

module.exports = {
    Recipe,
    Review,
    List,
    User
};