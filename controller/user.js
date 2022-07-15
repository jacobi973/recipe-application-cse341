const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {User} = require('../model/schemas');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, (_accessToken, _refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                new User({
                    googleId: profile.id,
                    username: profile.displayName
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);

exports.update = (req, res) => {
    const id = req.user._id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`
          });
        } else res.redirect('/')
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error updating user with id=' + id
        });
        console.log(err);
      });
  
};

exports.delete = (req, res, next) => {
    if (!req.user.googleId && !req.body.googleId) {
      res.status(400).json({
        message: 'A valid id is needed to delete user'
      });
    } else {
      let id = ''
      if(req?.user?.googleId) {
        id = req.user.googleId;
      } else {
        id = req?.body?.googleId;
      }
      User.findOneAndDelete({ googleId: id })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot delete user with id=${id}. Maybe user was not found!`
            });
          } else {
            req.logout(req.user, err => {
                if(err) return next(err);
                res.status(200).render("deleted");
              });
            
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Could not delete user with id=' + id
          });
          console.log(err);
        });
    }
  };

// Find a single Recipe with an id
exports.findOne = (req, res) => {
  console.log(req.body);
    let googleId= '';
    if(req.user){
        googleId = req.user.googleId;
    } else {
        googleId = req?.body?.googleId;
    }
    console.log('googleId: ', googleId);
    if (!googleId) {
      res.status(400).json({
        message: 'A google id is needed to find you'
      });
    } else {
    User.find({ googleId: googleId })
      .then((data) => {
         res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving recipe with googleId =' + googleId
        });
        console.log(err);
      });
    }
};

exports.create  = (req, res) => {
    const user = new User({
        googleId: req.body.googleId,
        username: req.body.username
    });
    user.save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the user.'
        });
      });
}