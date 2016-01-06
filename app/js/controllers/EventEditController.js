

/* Controllers */

eventify
    .controller('EventEditController', ['$scope', '$routeParams', 'EventsResource', 'MapsService', 'UtilService',
        function($scope, $routeParams, Event, maps, util) {

          Event.get({
            eventId: $routeParams.eventId
          }, function(event) {

            maps.init(event.location, 14);
            maps.addLocation(event.location);

            event.detailsUrl = util.getDetailsUrl(event, "event");
            event.end.dateTime = moment(event.end.dateTime).toDate();
            event.start.dateTime = moment(event.start.dateTime).toDate();

            $scope.event = event;

          });

          $scope.$on('event', function(e, event) {
            console.log("redirect");
          });

        }
    ]);
