var passport = require('passport')
var data = require('../model/core-data.js');
var UserAppStrategy = require('passport-userapp').Strategy;

passport.use(new UserAppStrategy({
    appId: '5599f2a6557ed'
  },
  function(userprofile, done) {
    console.log("Demonio:", userprofile);

    data.User.findOrCreate(userprofile, function(err, user) {
      if (err) return done(err);
      return done(null, user);
    });
  }
));

exports.passport = passport;
