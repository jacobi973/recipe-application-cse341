const mongoose = require("mongoose");
const Schema = mongoose.Schema
const reviewSchema = new Schema({
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
});

// delete mongoose.connection models['Review'];

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);