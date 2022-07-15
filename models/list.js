const mongoose = require("mongoose");
const Schema = mongoose.Schema
const listSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

// delete mongoose.connection models['Review'];

module.exports = mongoose.models.List || mongoose.model('List', listSchema);