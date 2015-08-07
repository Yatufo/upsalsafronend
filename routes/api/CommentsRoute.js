var async = require('async');
var Promise = require('promise');
var data = require('../model/core-data.js');
var usersRoute = require('./UsersRoute.js');
var commentCollector = require('../collectors/CommentCollector.js');

exports.create = function(req, res) {
  var userId = req.user.sub;

  usersRoute.findById(userId)
    .then(function(user) {
      var commentData = new data.Comment(req.body);
      commentData.created = new Date();
      commentData.lastUpdate = commentData.created;
      commentData.user = user._id;
      commentData.userInfo = user.publicInfo;
      commentData.save(function(e) {
        if (e) throw e;

        res.location('/api/comments/' + commentData.id)
        res.status(201).send({
          id: commentData.id
        });
        commentCollector.collect(commentData);
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
      lastUpdate: new Date(),
      comment: req.body.comment
    }
  }, null, function(e, commentData) {
    if (e) throw e;

    res.status(204).send();
    commentCollector.collect(commentData);
  });
};
