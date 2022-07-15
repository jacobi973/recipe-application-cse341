const mongoose = require('mongoose');

// Recipe schema
const recipe = new mongoose.Schema({
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
const Recipe = mongoose.model('Recipe', recipe)

// List schema
const list = new mongoose.Schema({
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
const Reviews = mongoose.model('reviews', reviews)

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
    Reviews,
    List,
    User
};