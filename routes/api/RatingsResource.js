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
      _id: "$vote",
      count: {
        $sum: 1
      }
    })
    .exec(callback);
}

var updateLocationRatings = function(ratings, callback) {
  data.Location.findOneAndUpdate({
    id: ratings.location
  }, {
    $set: {
      ratings: [ratings.ratingcount]
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

    collectRatings(ratingData.location, function(e, ratingcount) {
      if (e) throw e;
      console.log("ratings count collected")

      updateLocationRatings({
        location: req.body.location,
        ratingcount: ratingcount
      }, function(e) {
        if (e) throw e;

        console.log("setting the ratings count")
        res.location('/api/locations/' + ratingData.id)
        res.status(201).send({
          id: ratingData.id
        }); //ngResource does not support location header

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
