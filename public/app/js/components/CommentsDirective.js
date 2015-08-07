'use strict';

/* App Module */
var CommentDirectiveController = function($scope, $rootScope, service) {

  $scope.comments = $scope.location.comments || [];
  $scope.comments.forEach(function (comment) {
    comment.formattedDate = moment(comment.lastUpdate).fromNow();
    comment.isEditable = $rootScope.user && _.isEqual(comment.user, $rootScope.user._id);
  });

  function reset() {
    $scope.current = {
      location : $scope.location,
      isEditable: service.isCommentAllowed($scope.location),
      textRows: 1,
      isEditing: false,
      comment: null
    }
  }

  reset();
  $scope.$watch("current.comment", function(newValue, oldValue) {
    $scope.current.isEditing = !_.isEmpty(newValue);
  })

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
  }

  $scope.save = function(comment) {
    comment.isEditing = false;

    service.saveOrUpdateComment(comment)
    .then(function() {
      $scope.comments.push(comment);
      reset();
    }).catch(function (e) {
      console.warn('comment not saved', e);
    });


  }

}


angular.module('eventify').directive('comments', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      location: '='
    },
    controller: ['$scope', '$rootScope', 'CommentService',CommentDirectiveController],
    templateUrl: 'views/components/comments.html'
  };
});
