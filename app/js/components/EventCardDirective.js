
var EventCardController = function($scope, $rootScope, Event, util) {

  $scope.$watch("event", function(event) {
    if (! _.isEmpty(event)) {
      $scope.options.delete = $scope.options.delete && util.isUserOwned(event);
      $scope.options.edit = $scope.options.edit && util.isUserOwned(event);
    }
  });

  $scope.delete = function () {
    if (confirm("Are you sure to remove this event?")) {
      $scope.event.$remove(function(e) {
        alert("The event: " + $scope.event.name + " has been deleted");
      });
    };
  }
}
/* App Module */

eventify.directive('eventcard', function() {
    return {
        restrict: 'E',
        scope: {
            event: '=',
            options: '=?'
        },
        controller: ['$scope', '$rootScope', 'EventsResource', 'UtilService', EventCardController],
        templateUrl: 'views/components/event-card.html'
    };
});
