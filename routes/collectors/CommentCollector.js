var data = require('../model/core-data.js');



var updateLocationComments = function(comment) {

  data.Location.findOneAndUpdate({
    id: comment.location
  }, {
    $addToSet: {
      comments: comment._id
    }
  }).exec();

}


exports.collect = function(comment, done) {
  updateLocationComments(comment);
}
