const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {User} = require('../model/schemas');
const ObjectId = require('mongodb').ObjectId;

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



// eslint-disable-next-line no-unused-vars
exports.update = (req, res) => {
  console.log('updated',req.body);
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
    if (!ObjectId.isValid(req.user._id)) {
      res.status(400).json({
        message: 'A valid id is needed to delete user'
      });
    } else {
      const id = req.user._id;
  
      User.findByIdAndRemove(id)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot delete user with id=${id}. Maybe user was not found!`
            });
          } else {
            req.logout(req.user, err => {
                if(err) return next(err);
                res.render("deleted");
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