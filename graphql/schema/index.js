const { buildSchema} = require("graphql");

module.exports = buildSchema(`
    type Recipe {
        _id: ID!
        name: String!
    }

    type Review {
        _id: ID!
        userId: String
        review: String
        rating: String
        recipeId: String
    }

    type List {
        _id: ID!
        title: String!
    }

    input RecipeInput {
        name: String!
    }

    input ReviewInput {
        userId: String
        review: String
        rating: String
        recipeId: String
    }

    input ListInput {
        title: String!
        userId: String
    }

    type Query {
        recipes:[Recipe!],
        reviews:[Review!],
        lists:[List!]
    }

    type Mutation {
        createRecipe(recipe:RecipeInput): Recipe,
        createReview(review:ReviewInput): Review,
        createList(list:ListInput): List
    }

    schema {
        query: Query
        mutation: Mutation
    }
`)