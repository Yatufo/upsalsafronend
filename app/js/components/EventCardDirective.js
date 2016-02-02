
var EventCardController = function($scope, $rootScope, Event) {
  $scope.options.delete = $scope.options.delete && $rootScope.user && _.isEqual($scope.event.createdBy, $rootScope.user._id);

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
            options: '='
        },
        controller: ['$scope', '$rootScope', 'EventsResource', EventCardController],
        templateUrl: 'views/components/event-card.html'
    };
});
