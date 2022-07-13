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
        describe('get by recipe ID', () => {
            it('gets single recipe using recipe ID', async() => {
                const res = await ( request(app).get('/recipes/62b25438f507e8b500d4c1c4'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.name).toEqual('Creamy Mashed Potatos');
            });
        });

        describe('post one recipe', () => {
            it('post a new recipe', async() => {
                const res = await (request(app).post('/recipes')
                .send({
                    name: 'Scrambled Eggs',
                    ingredients: [
                        '4 large eggs',
                        '1 Tbs butter'
                    ],
                    instructions: [
                        '1. Melt butter in pan',
                        '2. Stir in eggs'
                    ],
                    servings: 2,
                    imageLink: 'scrambledeggz.jpg',
                    keyWords: [
                        'eggs',
                        'yummy'
                    ],
                    userPosted: '62b0d6fc3620510a74d6ecba'
                })
                );
                expect(res.statusCode).toEqual(200);

            });
        });

        describe('get recipe(s) by user ID', () => {
            it('gets all recipes posted by user', async() => {
                const res = await ( request(app).get('/recipes/userPosted/62b0d6fc3620510a74d6ecba'));
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('get recipe(s) by keyword', () => {
            it('gets all recipes matching given keyword', async() => {
                const res = await ( request(app).get('/recipes/keyWords?keyWords=cookie'));
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('get recipe by ingredient', () => {
            it('find recipe(s) by matching ingredient', async() => {
                const res = await ( request(app).get('/recipes/ingredients?ingredients=milk'));
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('update recipe', () => {
            it('edit recipe using recipe ID', async() => {
                const res = await (request(app).put('/recipes/62c777c9f16396c2cabc4310'))
                .send({keyWords: ['breakfast']});
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('delete recipe', () => {
            it('delete recipe using recipe ID', async() => {
                const res = await (request(app).delete('/recipes/62c89b9cc261961750369279'));
                expect(res.statusCode).toEqual(200);
            });
        });
    });
});