'use strict';

/* App Module */
var RatingDirectiveController = function($scope, $rootScope, service) {

  var updateVoteSummaryLocally = function(rating, newVote) {
    rating.votes = rating.votes || [];
    var oldVote = rating.vote;
    //Decrease the value of the userVote rating
    if (oldVote && rating.votes[oldVote]) {
      rating.votes[oldVote] = rating.votes[oldVote] - 1 || undefined;
    }
    rating.votes[newVote] = rating.votes[newVote] + 1 || 1;
  }

  $scope.resetUnvotedRating = function() {
    $scope.current = undefined;
    if ($scope.ratings) {
      $scope.ratings.slice().reverse().forEach(function(rating) {
        if (!rating.votes) {
          $scope.current = rating;
        }
      });
    }
  };

  $scope.rate = function(rating, userVote) {

    //if there are no changes in the vote
    if (rating.vote && rating.vote === userVote)
      return false;

    var unsavedVote = rating.vote;
    rating.vote = userVote;

    service.saveOrUpdateRating(rating)
    .then(function() {
      updateVoteSummaryLocally(rating, userVote);
      $scope.resetUnvotedRating();

      //TODO: move this to the service.
      rating.isUp = (rating.vote === 'up');
      rating.isDown = (rating.vote === 'down');
    }).catch(function (e) {
      rating.vote = unsavedVote;
    });
  }

  $scope.resetUnvotedRating();

}


angular.module('eventify').directive('rating', function() {
  return {
    restrict: 'E',
    scope: {
      ratings: '='
    },
    controller: ['$scope', '$rootScope', 'RatingService', RatingDirectiveController],
    templateUrl: 'views/components/rating.html'
  };
});
