/* eslint-disable no-unused-vars */
const request = require('supertest');
// const app = require('../server');
const mongoose = require("mongoose");
const sinon = require('sinon');
const auth = require('../routes/auth-routes.js');

beforeEach((done) => {
    auth.isAdmin.callsFake((req, res, next) => next());
    mongoose.connect(process.env.mongoDb, { useUnifiedTopology: true, useNewUrlParser: true },
        () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});