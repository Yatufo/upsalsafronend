var async = require('async');
var data = require('../model/core-data.js');
var ctx = require('../util/conf.js').context();


var callback = function(err) {
  if (err) throw err;

};


var collectRatings = function(locationId, callback) {
  data.Rating.aggregate()
    .match({
      location: locationId
    })
    .group({
      _id: {
        vote: "$vote",
        category: "$category"
      },
      count: {
        $sum: 1
      }
    })
    .exec(function(e, results){
        if (e) throw e;
        var ratings = {}
        results.forEach(function(result){
          var summary = ratings[result._id.category] || { category : result._id.category, votes : {}};
          summary.votes[result._id.vote] = result.count;
          ratings[result._id.category] = summary;
        });

        callback(undefined, Object.keys(ratings).map(function (key) { return ratings[key]}));
      });
};

updateLocationRatings = function(location){

  collectRatings(location, function(e, ratings) {
    data.Location.findOneAndUpdate({
      id: location
    }, {
      $set: {
        ratings: ratings
      }
    }).exec();
  });

}
//
//
exports.create = function(req, res) {

  var ratingData = new data.Rating(req.body);


  ratingData.save(function(e) {
    if (e) throw e;

    res.location('/api/locations/' + ratingData.id)
    res.status(201).send({
      id: ratingData.id
    });

    updateLocationRatings(ratingData.location);
  });
};

//
//
exports.update = function(req, res) {

  data.Rating.findOneAndUpdate({
    _id: req.body.id
  }, {
    $set: {
      vote: req.body.vote
    }
  }, null, function(err, ratingData) {
    if (e) throw e;

    res.status(204).send();

    updateLocationRatings(ratingData.location);
  });
};
