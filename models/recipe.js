const mongoose = require("mongoose");
const Schema = mongoose.Schema
const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

// delete mongoose.connection.models['Recipe'];

module.exports = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);