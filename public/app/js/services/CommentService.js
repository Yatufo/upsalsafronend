

/* Service */

var RatingService = function($rootScope, $q, Comment) {

  var service = {

    isCommentAllowed : function (commentable) {
      if (_.isEmpty($rootScope.user))
        return true;

      var userId = $rootScope.user._id;
      return _.isEmpty(_.findWhere(commentable.comments, {user : userId}));
    },
    saveOrUpdateComment: function(comment) {
      return $q(function(resolve, reject) {

        var resource = new Comment({
          id: comment.id,
          location: comment.target.id,
          comment: comment.comment
        });

        if (!resource.id) {
          resource.$save(function(saved) {
            comment.id = saved.id;
            resolve(comment);
          }, reject);
        } else {
          Comment.update(resource, resolve, reject);
        }
      });
    }
  };

  return service;

};
angular.module('eventifyServices')
  .factory('CommentService', ['$rootScope', '$q', 'CommentResource', RatingService]);
