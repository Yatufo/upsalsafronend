var async = require('async');
var data = require('../model/core-data.js');

//
//
exports.findOrCreate = function(req, done) {
  var userId = req.user.sub;
  var findUser = new Promise(function(resolve, reject) {
    data.User.findOne({
      'sync.auth0': userId
    }, null, function(e, person) {
      if (e){
        console.warn("Could not query user", e);;
      }
      if (person) {
        resolve(person)
      } else {
        reject(e);
      }
    });
  })

  var createUser = function() {
    return new Promise(function(resolve, reject) {
      var userData = new data.User({
        sync: {
          auth0: userId
        }
      });

      userData.save(function(e) {
        if (e) throw e;
        resolve(userData);
      });
    });
  }


  findUser
    .then(done)
    .catch(function() {
      createUser().then(done)
    });

};
