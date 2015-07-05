var data = require('../model/core-data.js');
var ctx = require('../util/conf.js').context();


//
//
exports.create = function(req, res) {

  var ratingData = new data.Rating(req.body);
  ratingData.save(function(err) {
    if (err) {
      res.status(500).send(err);
    }

    res.location('/api/locations/' + ratingData.id)
    res.status(201).send({id: ratingData.id}); //ngResource does not support location header
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
