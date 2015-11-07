
var LocationCarcController = function ($scope) {
  $scope.showComments = false;

  $scope.toogleComments = function () {
    $scope.showComments = !$scope.showComments;
  }
}

/* App Module */

angular.module('eventify').directive('locationcard', function() {
    return {
        restrict: 'E',
        replace : true,
        scope: {
            location: '=',
            city: '='
        },
        controller: ['$scope', LocationCarcController],
        templateUrl: 'views/components/location-card.html'
    };
});
