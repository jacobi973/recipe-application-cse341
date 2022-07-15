const Review = require("../../models/review");
const Recipe = require("../../models/recipe");
const { addNewRecipe } = require("../../validation");

module.exports = {
    recipes: async() => {
        try {
            const recipesFetched = await Recipe.find()
            return recipesFetched.map(recipe => {
                return {
                    ...recipe._doc,
                    _id: recipe.id,
                    
                }
            })
        } catch (error){
            throw error
        }
    },

    reviews: async() => {
        try {
            const reviewsFetched = await Review.find()
            return reviewsFetched.map(review => {
                return {
                    ...review._doc,
                    _id: review.id,
                }
            })
        } catch (error){
            throw error
        }
    },

    lists: async() => {
        try {
            const listsFetched = await List.find()
            return listsFetched.map(list => {
                return {
                    ...list._doc,
                    _id: list.id,
                }
            })
        } catch (error){
            throw error
        }
    },

    createRecipe: async args => {
        try {
            const {name, ingredients, instructions} = args.recipe
            const recipe = new Recipe({
                name
            })
            const newRecipe = await recipe.save()
            return { ...newRecipe._doc, _id: newRecipe.id}
        } catch (error) {
            throw error
        }
    },

    createReview: async args => {
        try {
            const {review, rating, userId, recipeId} = args.review
            const revu = new Review({
                review,
                rating, 
                userId, 
                recipeId
            })
            const newReview = await revu.save()
            return { ...newReview._doc, _id: newReview.id}
        } catch (error) {
            throw error
        }
    },

}