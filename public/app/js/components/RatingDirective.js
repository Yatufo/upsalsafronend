

/* App Module */
var RatingDirectiveController = function($scope, $rootScope, service) {

  var updateVoteSummaryLocally = function(rating, oldVote) {
    rating.votes = rating.votes || [];
    var currentVote = rating.vote;
    //Decrease the value of the userVote rating
    if (oldVote && rating.votes[oldVote]) {
      rating.votes[oldVote] = rating.votes[oldVote] - 1 || undefined;
    }
    rating.votes[currentVote] = rating.votes[currentVote] + 1 || 1;
  }

  var resetCurrent = function () {
    $scope.current = _.findWhere($scope.ratings, { "votes" : null})
  }

  $scope.isRated = function (rating, vote) {
    return rating.vote === vote;
  }

  $scope.$watch("ratings", function() {
    resetCurrent();
  });

  $scope.rate = function(rating, userVote) {

    //if there are no changes in the vote
    if (rating.vote && rating.vote === userVote)
      return false;

    var unsavedVote = rating.vote;
    rating.vote = userVote;

    service.saveOrUpdateRating(rating)
    .then(function() {
      updateVoteSummaryLocally(rating, unsavedVote);
      resetCurrent();
    }).catch(function (e) {
      rating.vote = unsavedVote;
    });
  }


}


angular.module('eventify').directive('rating', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      ratings: '='
    },
    controller: ['$scope', '$rootScope', 'RatingService', RatingDirectiveController],
    templateUrl: 'views/components/rating.html'
  };
});
