const request = require('supertest');
const app = require('../server');
const mongoose = require("mongoose");
require('dotenv').config();

beforeEach((done) => {
    mongoose.connect(process.env.mongoDb, { useUnifiedTopology: true, useNewUrlParser: true },
        () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});

describe('recipes', () => {
    describe('get recipe route', () => {
        describe('given recipe does not exist', () => {
            it('should return a 400', async () => {
                const recipeId = '1';
                await request(app).get(`/recipes/${recipeId}`).expect(400);
            });
        });
        describe('get all recipes', () => {
            it('pulls all recipes from database', async () => {
                const res = await (await request(app).get('/recipes'));
                expect(res.statusCode).toEqual(200);
            });
        });
    });
});