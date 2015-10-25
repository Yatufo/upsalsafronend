/* App Module */
var CommentDirectiveController = function($scope, $rootScope, $sce, service) {

  var MAX_TEXTBOX_ROWS = 7;
  var MIN_TEXTBOX_ROWS = 2;

  var getTextRows = function (text) {
    if (! text) return 1;

    var rows = text.split('\n').length + 1;
    rows = (rows <= MAX_TEXTBOX_ROWS ? rows : MAX_TEXTBOX_ROWS);
    rows = (rows >= MIN_TEXTBOX_ROWS ? rows : MIN_TEXTBOX_ROWS);
    return rows;
  };

  var reset = function(commentable) {
    if (_.isEmpty(commentable))
      return;

    $scope.current = {
      target: commentable,
      isEditable: function () {
        return service.isCommentAllowed(commentable);
      },
      textRows: function () {
        return getTextRows(this.comment);
      },
      isEditing: false,
      comment: null
    };


    if (commentable.comments) {
      commentable.comments.forEach(function(comment) {
        comment.target = comment.location;
        comment.formattedDate = moment(comment.lastUpdate).fromNow();
        comment.formattedComment = $sce.trustAsHtml(comment.comment.replace(/\n/g, "<br/>"));
        comment.isEditable = function() {
          return $rootScope.user && _.isEqual(comment.user, $rootScope.user._id);
        };
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
        $scope.current.textRows = getTextRows($scope.current.comment);
      });
    }
  }));

  $scope.edit = function(comment) {
    comment.originalComment = comment.comment;
    comment.textRows = getTextRows(comment.comment);
    comment.isEditing = true;
  };

  $scope.onKeyDown = function(comment, e) {

    if (e.keyCode == 13) {
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
    controller: ['$scope', '$rootScope', '$sce', 'CommentService', CommentDirectiveController],
    templateUrl: 'views/components/comments.html'
  };
});
