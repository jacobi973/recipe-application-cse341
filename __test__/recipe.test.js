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
            it('should return a 404', async () => {
                const recipeId = '1';
                await request(app).get(`/${recipeId}`).expect(404);
            });
        });
        describe('get recipes', () => {
            it('pulls recipes from database', async () => {
                const res = await (await request(app).get('/recipes'));
                expect(res.statusCode).toEqual(200);
            });
        });
        describe('get one recipe', () => {
            it('gets single recipe', async() => {
                const res = await ( request(app).get('/recipes/62b25438f507e8b500d4c1c4'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.name).toEqual('Creamy Mashed Potatos')
            });
        });

// post not working yet because it redirects to login
        // describe('post one recipe', () => {
        //     it('post a recipe', async() => {
        //         const res = await (request(app).post('/recipes'));
        //         expect(res.statusCode).toEqual()
        //     });
        // });
    });
});