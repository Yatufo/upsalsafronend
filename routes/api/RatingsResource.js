var async = require('async');
var data = require('../model/core-data.js');
var ctx = require('../util/conf.js').context();
var Promise = require('promise');


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
        var summaries = {}
        results.forEach(function(result){
          var summary = summaries[result._id.category] || { category : result._id.category, votes : {}};
          summary.votes[result._id.vote] = result.count;
          summaries[result._id.category] = summary;
        });
        var mapped = Object.keys(summaries).map(function (key) { return summaries[key]})
        callback(undefined, mapped);
      });
};

var updateLocationRatings = function(counts, callback) {
  data.Location.findOneAndUpdate({
    id: counts.location
  }, {
    $set: {
      ratings: counts.ratings
    }
  }, {}, callback);
};

//
//
exports.create = function(req, res) {

  var ratingData = new data.Rating(req.body);


  ratingData.save(function(e) {
    if (e) throw e;
    console.log("rating saved")

    res.location('/api/locations/' + ratingData.id)
    res.status(201).send({
      id: ratingData.id
    }); //ngResource does not support location header


    collectRatings(ratingData.location, function(e, counts) {
      if (e) throw e;

      updateLocationRatings({
        location: req.body.location,
        ratings: counts[0].ratings
      }, function(e) {
        if (e) throw e;
      })
    });
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
  }, null, function(err) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(204).send();
  });
};
