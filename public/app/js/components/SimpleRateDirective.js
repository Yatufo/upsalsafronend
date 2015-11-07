/* App Module */
var SimpleRateDirectiveController = function($scope, service) {


  $scope.init = function() {
    $scope.rating = {};

    if ($scope.rateable) {

      $scope.rating = _.find($scope.rateable.summaries, function(summary) {
        return summary.category.id === $scope.category;
      });

    }
  }

  $scope.init();

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
    console.log("demonio",$scope.rateable);
    return rating && rating.vote === vote;
  };

  $scope.$watch("ratings", function() {
    $scope.init();
  });

  $scope.rate = function() {
    var userVote = userVote || 'up';
    var rating = $scope.rating;

    //if there are no changes in the vote
    if (rating.vote && rating.vote === userVote) {
      return false;
    }

    var unsavedVote = rating.vote;
    rating.vote = userVote;

    service.saveOrUpdateRating(rating)
      .then(function() {
        updateVoteSummaryLocally(rating, unsavedVote);
        $scope.init();
      }).catch(function(e) {
        rating.vote = unsavedVote;
      });
  };


};


angular.module('eventify').directive('simplerate', function() {
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
