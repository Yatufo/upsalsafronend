var async = require('async');
var data = require('../model/core-data.js');


exports.findCurrent = function(req, res) {
  exports.findOrCreate(req, 'ratings', function(user) {
    if (user) res.send(user);
    else throw new Error("not able to retrive or create the user");
  });
};
//
//
exports.findOrCreate = function(req, populate, done) {
  var userId = req.user.sub;
  var findUser = new Promise(function(resolve, reject) {
    data.User.findOne({
        'sync.auth0': userId
      })
      .populate(populate)
      .exec(function(e, foundUser) {
        if (foundUser) {
          resolve(foundUser)
        } else {
          reject()
        }
        if (e) console.warn("Could not query user", e);
      });
  })

  var createUser = function() {
    return new Promise(function(resolve, reject) {
      var newUser = new data.User({
        sync: {
          auth0: userId
        }
      });

      newUser.save(function(e) { 
        if (e) reject(e);
        else resolve(newUser);
      });
    });
  }


  findUser
    .then(done)
    .catch(function() {
      createUser().then(done)
    });

};
