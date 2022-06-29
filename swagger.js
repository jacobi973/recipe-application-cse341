const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: "1.0.0",
        title: "Recipe and Shopping List API",
        description: "Recipe database with reviews and shopping list"
    }, 
    host: `${process.argv.splice(2)}`,
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            "name": "Recipes",
            "description": "Recipe database"
        },
        {
            "name": "Reviews",
            "description": "Reviews of recipes"
        },
        {
            "name": "List",
            "description": "Shopping list for recipes"
        },
        {
            "name": "User",
            "description": "Registered users"
        }
    ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);