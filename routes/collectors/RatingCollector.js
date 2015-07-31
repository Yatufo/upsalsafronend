var Promise = require('promise');
var data = require('../model/core-data.js');
// var usersRoute = require('./UsersRoute.js');



var updateLocationRatings = function(rating) {

    crunchRatingData({
      location: rating.location
    }, function(e, ratings) {
      data.Location.findOneAndUpdate({
        id: rating.location
      }, {
        $set: {
          ratings: ratings
        }
      }).exec();
    });

  }

var updateUserRatings = function(rating) {

  var findAllUserRatings = new Promise(function(resolve, reject) {
    data.Rating.find({user : rating.user}).exec(function(e, userRatings){
      if(e) reject (e);
      else resolve(userRatings);
    })
  });

  var updateUser = function(userRatings){
    data.User.findById(rating.user, function(e, user) {
      if (e) throw e;
      user.ratings = userRatings;
      user.save(function(e){
        if (e) throw e;
      })
    });
  }

  findAllUserRatings.then(updateUser);

}



var crunchRatingData = function(match, done) {
  data.Rating.aggregate()
    .match(match)
    .group({
      _id: {
        vote: "$vote",
        category: "$category"
      },
      count: {
        $sum: 1
      }
    })
    .exec(function(e, results) {
      if (e) throw e;
      var ratings = {}
      results.forEach(function(result) {
        var summary = ratings[result._id.category] || {
          category: result._id.category,
          votes: {}
        };
        summary.votes[result._id.vote] = result.count;
        ratings[result._id.category] = summary;
      });

      done(undefined, Object.keys(ratings).map(function(key) {
        return ratings[key]
      }));
    });
};



exports.collect =  function(rating, done) {
  updateLocationRatings(rating);
  updateUserRatings(rating);
}
