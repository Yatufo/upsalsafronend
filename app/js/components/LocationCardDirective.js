
var LocationCardController = function ($scope) {
  $scope.showComments = false;

  $scope.toogleComments = function () {
    $scope.showComments = !$scope.showComments;
  }

  $scope.createEvent = function() {
    $scope.creatingEvent = true;
  }

  $scope.$on('event', function(event) {
    $scope.creatingEvent = false;
  });



}

/* App Module */

eventify.directive('locationcard', function() {
    return {
        restrict: 'E',
        scope: {
            location: '=',
            options: '='
        },
        controller: ['$scope', LocationCardController],
        templateUrl: 'views/components/location-card.html'
    };
});
