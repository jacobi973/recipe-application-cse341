const express = require('express');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require("mongoose");
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers')
const app = express();

// endpoint for graphql
app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));

// connect to db
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0ii3glm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(uri, options).then(() =>app.listen(3000, console.log("Server connected")))
.catch(error => {
    throw error
});
