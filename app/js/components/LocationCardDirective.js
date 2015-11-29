
var LocationCardController = function ($scope) {
  $scope.showComments = false;

  $scope.toogleComments = function () {
    $scope.showComments = !$scope.showComments;
  }
}

/* App Module */

eventify.directive('locationcard', function() {
    return {
        restrict: 'E',
        replace : true,
        scope: {
            location: '=',
            city: '=',
            options: '='
        },
        controller: ['$scope', LocationCardController],
        templateUrl: 'views/components/location-card.html'
    };
});
