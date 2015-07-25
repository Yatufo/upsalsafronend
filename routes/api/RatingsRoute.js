var async = require('async');
var Promise = require('promise');
var data = require('../model/core-data.js');
var usersRoute = require('./UsersRoute.js');
var ratingCollector = require('../collectors/RatingCollector.js');

exports.create = function(req, res) {

  var resolveUser = new Promise(function(resolve, reject) {
    usersRoute.findOrCreate(req, "", function(user) {
      if (user) resolve(user);
      else reject();
    });
  });

  resolveUser.then(function(user) {
    var ratingData = new data.Rating(req.body);
    ratingData.user = user._id;
    ratingData.save(function(e) {
      if (e) throw e;

      res.location('/api/locations/' + ratingData.id)
      res.status(201).send({
        id: ratingData.id
      });
      ratingCollector.collect(ratingData);
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
  }, null, function(e, ratingData) {
    if (e) throw e;

    res.status(204).send();
    ratingCollector.collect(ratingData);
  });
};
