/* App Module */
var CommentDirectiveController = function($scope, $rootScope, service) {

  var reset = function(commentable) {
    if (_.isEmpty(commentable))
      return;

    $scope.current = {
      target: commentable,
      isEditable: function () {
        return service.isCommentAllowed(commentable); 
      },
      textRows: 1,
      isEditing: false,
      comment: null
    };


    if (commentable.comments) {
      commentable.comments.forEach(function(comment) {
        comment.target = comment.location;
        comment.formattedDate = moment(comment.lastUpdate).fromNow();
        comment.isEditable = function() {
          return $rootScope.user && _.isEqual(comment.user, $rootScope.user._id);
        }
      });
    }
  };

  $scope.$watch("commentable", function(newValue, oldValue) {
    reset(newValue);
  });

  $scope.$watch("current.comment", _.debounce(function(newValue, oldValue) {
    if ($scope.current) {
      $scope.$apply(function() {
        $scope.current.isEditing = !_.isEmpty(newValue);
      })
    }
  }));

  $scope.edit = function(comment) {
    comment.originalComment = comment.comment;
    comment.isEditing = true;
  };

  $scope.onKeyDown = function(comment, e) {

    if (e.keyCode == 13) {
      comment.textRows++;
      if ((e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        $scope.save(comment);
      }
    } else if (e.which == 27) {
      comment.comment = comment.originalComment;
      comment.isEditing = false;
    }

    return true;
  };

  $scope.save = function(comment) {
    comment.isEditing = false;

    service.saveOrUpdateComment(comment)
      .then(function(saved) {
        if (!comment._id) {
          $scope.commentable.comments.push(saved);
        }
        $scope.expanded = true;
        reset($scope.commentable);
      }).catch(function(e) {
        comment.isEditing = true;
        console.warn('comment not saved', e);
      });
  };

  $scope.toogleView = function() {
    $scope.expanded = !$scope.expanded;
  };

};


angular.module('eventify').directive('comments', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      commentable: '=',
      expanded: '='
    },
    controller: ['$scope', '$rootScope', 'CommentService', CommentDirectiveController],
    templateUrl: 'views/components/comments.html'
  };
});
