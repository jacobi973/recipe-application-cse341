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

describe('reviews', () => {
    
    describe('get review route', () => {
        // describe('given review does not exist', () => {
        //     it('should return a 400', async () => {
        //         const reviewId = '1';
        //         awaitrequest(app).get(`/reviews/${reviewId}`).expect(400);
        //     });
        // });


        describe('get review(s) by recipe ID', () => {
                it('retrieve reviews for chosen recipe', async () => {
                    const res = await (await request(app).get(`/reviews/62b23fc9461fa48b03fe0b21`).set('apikey', process.env.apikey));
                    expect(res.statusCode).toEqual(200);
                });
            });

        
        // the following query is not being used
        // describe('get all reviews', () => {
        //     it('pulls all reviews from database', async () => {
        //         const res = await (awaitrequest(app).get('/reviews'));
        //         expect(res.statusCode).toEqual(200);
        //     });
        // });

        // the following is not being used
        // describe('get by review ID', () => {
            // it('gets single review using review ID', async() => {
            //     const res = await (request(app).get('/reviews/62be3010a16f9716b2466380'));
            //     expect(res.statusCode).toEqual(200);
//                expect(res.body.rating).toEqual(5)
        //     });
        // });

        describe('post one review', () => {
            it('post a new review for a recipe', async() => {
                const res = await (request(app).post('/reviews/62b25438f507e8b500d4c1c4')
                .set('apikey', process.env.apikey)
                .send({
                    review: 'so easy to make!',
                    rating: 5
                })
                );
                expect(res.statusCode).toEqual(200);
            });
        });

        // this query is not being used
        // describe('get review(s) by user ID', () => {
        //     it('gets all reviews posted by user', async() => {
        //         const res = await (request(app).get('/reviews/userPosted/62b0d6fc3620510a74d6ecba'));
        //         expect(res.statusCode).toEqual(200);
        //     });
        // });

        // this query is not being
        // describe('get review(s) by rating', () => {
        //     it('gets all recipes matching given rating of 5', async() => {
        //         const res = await (request(app).get('/reviews/rating?rating=5'));
        //         expect(res.statusCode).toEqual(200);
        //     });
        // });

        describe('update review', () => {
            it('edit review using recipe ID', async() => {
                const res = await (request(app).put('/reviews/62b23fc9461fa48b03fe0b21'))
                .set('apikey', process.env.apikey)
                .send({rating: 5});
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('delete review', () => {
            it('delete review using review ID', async() => {
                const res = await (request(app).delete('/reviews/62cef60df0daa11ad34cf313').set('apikey', process.env.apikey));
                expect(res.statusCode).toEqual(200);
            });
        });
    });
});