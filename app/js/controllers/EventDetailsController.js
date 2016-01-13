

/* Controllers */

eventify
    .controller('EventDetailsController', ['$scope', '$routeParams', 'EventsResource', 'MapsService', 'UtilService',
        function($scope, $routeParams, Event, maps, util) {

          $scope.event = {};

          Event.get({
            id: $routeParams.eventId
          }, function(event) {

            event.detailsUrl = util.getDetailsUrl(event, "event");
            event.location.id = event.id;
            event.location.name = event.name;
            event.location.detailsUrl = event.detailsUrl;

            maps.init(event.location, 14);
            maps.addLocation(event.location);


            $scope.event = event;

          });

        }
    ]);
