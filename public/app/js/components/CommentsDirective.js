/* App Module */
var CommentDirectiveController = function($scope, $rootScope, service) {

  var reset = function(commentable) {
    if (_.isEmpty(commentable))
      return;

    $scope.current = {
      target: commentable,
      isEditable: true, //service.isCommentAllowed(commentable),
      textRows: 1,
      isEditing: false,
      comment: null
    };

    if (commentable.comments) {
      commentable.comments.forEach(function(comment) {
        comment.formattedDate = moment(comment.lastUpdate).fromNow();
        comment.isEditable = $rootScope.user && _.isEqual(comment.user, $rootScope.user._id);
      });
    }
  };

  $scope.$watch("commentable", function(newValue, oldValue) {
    reset(newValue);
  });

  $scope.$watch("current.comment", function(newValue, oldValue) {
    if ($scope.current)
      $scope.current.isEditing = !_.isEmpty(newValue);
  });

  $scope.onKeyDown = function(comment, e) {

    if (e.keyCode == 13) {
      comment.textRows++;
      if ((e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        $scope.save(comment);
      }
    } else if (e.which == 27) {
      reset();
    }

    return true;
  };

  $scope.save = function(comment) {
    comment.isEditing = false;

    service.saveOrUpdateComment(comment)
      .then(function() {
        $scope.commentable.comments.push(comment);
        reset();
      }).catch(function(e) {
        console.warn('comment not saved', e);
      });


  };

};


angular.module('eventify').directive('comments', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      commentable: '='
    },
    controller: ['$scope', '$rootScope', 'CommentService', CommentDirectiveController],
    templateUrl: 'views/components/comments.html'
  };
});
