

/* Controllers */

eventify
    .controller('EventDetailsController', ['$scope', '$routeParams', 'EventsResource', 'MapsService', 'UtilService',
        function($scope, $routeParams, Event, maps, util) {

          $scope.event = {};

          Event.get({
            id: $routeParams.eventId
          }, function(event) {

            maps.init(event.location, 14);
            maps.addLocation(event.location);

            event.detailsUrl = util.getDetailsUrl(event, "event");

            $scope.event = event;

          });

        }
    ]);
