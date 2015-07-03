'use strict';

/* App Module */

angular.module('eventify').directive('rating', function() {
  return {
    restrict: 'E',
    scope: {
      ratings: '='
    },
    controller: ['$scope', function($scope) {
      $scope.rate = function(ratings) {
        console.log('do the raiting' + ratings)
      }
    }],
    templateUrl: 'views/components/rating.html'
  };
});
