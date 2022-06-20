const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
    mongoose.connect(process.env.mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('db connected');
}

module.exports = connectDB;