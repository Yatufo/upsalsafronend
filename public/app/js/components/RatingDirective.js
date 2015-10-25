

/* App Module */
var RatingDirectiveController = function($scope, $rootScope, service) {

  var UNRATED_THRESHHOLD = 3;
  $scope.displayRatings = [];
  //Tell is the rating should show only one even if there are plenty already rated.
  $scope.showAll  = false;
  $scope.showOnlyOne  = !$scope.showAll;

  var updateVoteSummaryLocally = function(rating, oldVote) {
    rating.votes = rating.votes || [];
    var currentVote = rating.vote;
    //Decrease the value of the userVote rating
    if (oldVote && rating.votes[oldVote]) {
      rating.votes[oldVote] = rating.votes[oldVote] - 1 || undefined;
    }
    rating.votes[currentVote] = rating.votes[currentVote] + 1 || 1;
  };

  var resetDisplayRatings = function () {
    $scope.displayRatings = [];
    if (_.isEmpty(scope.ratings)) return;

    if (!$scope.showAll && $scope.showOnlyOne) {
      $scope.displayRatings.push($scope.ratings[0]);
    } else {
      //get all the voted ones
      $scope.displayRatings = _.filter($scope.ratings, function(r){ return ! _.isEmpty(r.votes); });

      if ($scope.showAll || $scope.ratings.length - $scope.displayRatings.length <= UNRATED_THRESHHOLD) {
        $scope.displayRatings = $scope.ratings;
      } else {
        var unrated = _.findWhere($scope.ratings, { "votes" : null});
        $scope.displayRatings.push(unrated);
      }
    }
  };

  $scope.isRated = function (rating, vote) {
    return rating.vote === vote;
  };

  $scope.$watch("ratings", function() {
    resetDisplayRatings();
  });

  $scope.toogleMore = function () {
    $scope.showAll = !$scope.showAll;
    resetDisplayRatings();
  };

  $scope.rate = function(rating, userVote) {

    //if there are no changes in the vote
    if (rating.vote && rating.vote === userVote)
      return false;

    var unsavedVote = rating.vote;
    rating.vote = userVote;

    service.saveOrUpdateRating(rating)
    .then(function() {
      updateVoteSummaryLocally(rating, unsavedVote);
      $scope.showAll = true;
      resetDisplayRatings();
    }).catch(function (e) {
      rating.vote = unsavedVote;
    });
  };


};


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
