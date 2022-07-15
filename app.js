const express = require('express');
const connectDB = require('./controller/dbConnection');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
// eslint-disable-next-line no-unused-vars
// const passportSetup = require('./controller/user');
const authRoutes = require('./routes/auth-routes');
// const userRoutes = require('./routes/user-routes');
const swaggerDocument = require('./swagger.json');
const sessions = require('express-session');

const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const authCheck = require('./routes/index');

const env = require('dotenv').config();

const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const app = express();

const Recipe = require('./model/schemas');
const { default: mongoose } = require('mongoose');
// const { Recipe } = require('./model/schemas');


require('dotenv').config();
// const port = process.env.PORT || 3000;

  var options = {
    customCssUrl: '/custom.css'
  };

// set view engine
app.set('view engine', 'ejs');
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());
// set up session cookies
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
app.use(express.json({
    extensions: false
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
// set up routes
app.use('/auth', authRoutes);
app.use('/', require('./routes/index'));
app.use('/api-docs', function(req, res, next){
    if (!req.user) {
        res.redirect('/auth/home');
      } else {
        next();
      }
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

// set up graphql
app.use(
  '/graphql', 
  graphqlHttp({
  schema: buildSchema(`
    type Recipe {
      _id: ID!
      name: String!
      ingredients: String
      instructions: String
      imageLink: String
      date: String
      keyWords: String
      userPosted: String
    }

    input RecipeInput {
      name: String!
      ingredients: String
      instructions: String
      imageLink: String
      date: String
      keyWords: String
      userPosted: String
    }

    type RootQuery {
      recipes: [Recipe!]!
    }

    type RootMutation {
      createRecipe(recipeInput: RecipeInput): Recipe
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    recipes: () => {
      return Recipe.find()
      .then(recipes => {
        return recipes.map(recipe => {
          return { ...recipe._doc, _id: recipe.id};
        });
      })
      .catch(err => {
        throw err;
      });
    },
    createRecipe: args => {
      const recipe = new Recipe({
        name: args.eventInput.name,
        ingredients: args.recipeInput.ingredients,
        instructions: args.recipeInput.instructions,
        imageLink: args.recipeInput.imageLink,
        date: new Date(args.recipeInput.date),
        keyWords: args.recipeInput.keyWords
      });
      return recipe
      .save()
      .then(result => {
        console.log(result);
        return { ...result._doc};
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
    } 
  },
  graphiql: true
}));

// app.listen(port, () => {
//     console.log(`Running on port ${port}`)
// });

mongoose.connect(
  `mongodb+srv://recipeApplication:pxGMSEjH8s2GMhvm@cluster0.0ii3glm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, {useNewUrlParser: true}
)
.then((db) => {
  console.log('Connected to server');
  app.listen(3000, () => {
    console.log('Running...')
  });
})
.catch(err => {
  console.log(err);
});

// connectDB();
