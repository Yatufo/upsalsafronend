/* App Module */
var SimpleRateDirectiveController = function($scope, service) {
  var DEFAULT_VOTE = 'up'

  $scope.init = function() {
    $scope.rating = {};

    if ($scope.rateable) {
      $scope.rating = _.find($scope.rateable.summaries, function(summary) {
        return summary.category && summary.category.id === $scope.category;
      });
    }
  }

  var updateVoteSummaryLocally = function(rating, oldVote) {
    rating.votes = rating.votes || [];
    var currentVote = rating.vote;
    //Decrease the value of the userVote rating
    if (oldVote && rating.votes[oldVote]) {
      rating.votes[oldVote] = rating.votes[oldVote] - 1 || undefined;
    }
    rating.votes[currentVote] = rating.votes[currentVote] + 1 || 1;
  };

  $scope.isRated = function(rating, vote) {
    vote = vote || DEFAULT_VOTE;
    rating = rating || $scope.rating;
    return rating && rating.vote === vote;
  };

  $scope.$watchGroup(["rateable.summaries", "category"], function() {
    if($scope.rateable && $scope.rateable.summaries && $scope.category){
      $scope.init();
    }
  });

  $scope.rate = function() {
    var rating = $scope.rating;
    var userVote = (rating.vote !== DEFAULT_VOTE ? DEFAULT_VOTE : 'down');

    //if there are no changes in the vote
    if (rating.vote && rating.vote === userVote) {
      return false;
    }

    var unsavedVote = rating.vote;
    rating.vote = userVote;

    service.saveOrUpdateRating(rating)
      .then(function() {
        updateVoteSummaryLocally(rating, unsavedVote);
      }).catch(function(e) {
        console.error(e);
        rating.vote = unsavedVote;
      });
  };


};


eventify.directive('simplerate', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      rateable: '=',
      category: '='
    },
    controller: ['$scope', 'RatingService', SimpleRateDirectiveController],
    templateUrl: 'views/components/simplerate.html'
  };
});
