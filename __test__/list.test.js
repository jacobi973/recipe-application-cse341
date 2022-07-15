require('dotenv').config();
const request = require('supertest');
const app = require('../server');
const mongoose = require("mongoose");


beforeEach((done) => {
    mongoose.connect(process.env.mongoDb, { useUnifiedTopology: true, useNewUrlParser: true },
        () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});

describe('lists', () => {
    describe('get list route', () => {
        describe('given list does not exist', () => {
            it('should return a 404', async () => {
                const listId = '1';
                await request(app).get(`/list/${listId}`).set('apikey', process.env.apikey).expect(404);
            });
        });
        describe('get all lists', () => {
            it('pulls all shopping lists from database', async () => {
                const res = await (request(app).get('/lists').set('apikey', process.env.apikey));
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('get list by user', () => {
            it('gets shopping list(s) belonging to certain user', async () => {
                const res = await (request(app).get('/lists/user/62be10476a021bb553294d78').set('apikey', process.env.apikey));
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('get list by list ID', () => {
            it('gets single list by list ID', async () => {
                const res = await (request(app).get('lists/62c7481fb3669e9048dcc176').set('apikey', process.env.apikey));
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('post a shopping list', () => {
            it('should create a shopping list for user', async() => {
                const res = await (request(app).post('/lists')
                .set('apikey', process.env.apikey)
                .send({
                    "title": "Kroger List",
                    "items": [
                      "peanuts",
                      "milky way",
                      "root beer",
                      "plastic forks"
                    ],
                    "userId": "62b22dbe5361f5388a5c5d87"
                  })
                );
                expect(res.statusCode).toEqual(200);
            });
        });


    });
});