const mongoose = require('mongoose');

const recipe = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [String],
    instructions: String,
    imageLink: String,
    date: Date,
    userPosted: String,
    keyWords: [String]
}, {
    collection: 'recipes'
});
const Recipe = mongoose.model('recipe', recipe)

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
        type: Number,
        required: true
    }
}, {
    collection: 'reviews'
});
const Reviews = mongoose.model('reviews', reviews)

const list = new mongoose.Schema({

}, {
    collection: 'list'
});
const List = mongoose.model('list', list)



const userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    thumbnail: String
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