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

describe('users', () => {
    describe('get user route', () => {
        describe('given user does not exist', () => {
            it('should return a 400', async () => {
                await request(app).get(`/user`).set('apikey', process.env.apikey).expect(400);
            });
        });
        describe('get by user ID', () => {
            it('gets by your user ID', async() => {
                const res = await (request(app).get('/user').send({googleId: '100288494535076797654'}).set('apikey', process.env.apikey));
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('post new user', () => {
            it('Create a new user', async() => {
                const res = await (request(app).post('/user')
                .set('apikey', process.env.apikey)
                .send({
                    googleId: '123456789',
                    username: 'Google Test'
                })
                );
                expect(res.statusCode).toEqual(200);

            });
        });
        // describe('delete user', () => {
        //     it('Delete a user', async() => {
        //         const res = await (request(app).get('/user/delete').set('apikey', process.env.apikey).send({googleId: '123456789'}));
        //         expect(res.statusCode).toEqual(200);
        //     }
        //     );
        // }
        // );
    });
});