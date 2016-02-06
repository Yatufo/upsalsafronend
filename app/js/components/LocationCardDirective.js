var LocationCardController = function($scope, util) {


  $scope.$watch("location", function(location) {
    if (location) {
      $scope.options.delete = $scope.options.delete && util.isUserOwned(location);
      $scope.options.edit = $scope.options.edit && util.isUserOwned(location);
    }
  });

  $scope.showComments = false;

  $scope.toogleComments = function() {
    $scope.showComments = !$scope.showComments;
  }

  $scope.createEvent = function() {
    $scope.creatingEvent = true;
  }

  $scope.$on('eventSaved', function(event) {
    $scope.creatingEvent = false;
  });

  $scope.$on('eventCancelled', function() {
    $scope.creatingEvent = false;
  });


}

/* App Module */

eventify.directive('locationcard', function() {
  return {
    restrict: 'E',
    scope: {
      location: '=',
      options: '=?'
    },
    controller: ['$scope', 'UtilService', LocationCardController],
    templateUrl: 'views/components/location-card.html'
  };
});
