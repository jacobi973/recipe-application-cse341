const swaggerAutogen = require('swagger-autogen')();

const doc = {
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);