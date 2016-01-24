

/* Controllers */

eventify
    .controller('EventEditController', ['$scope', '$routeParams', 'EventsResource', 'MapsService', 'UtilService', '$location',
        function($scope, $routeParams, Event, maps, util, $location) {

          Event.get({
            id: $routeParams.eventId
          }, function(event) {

            maps.init(event.location, 14);
            maps.addLocation(event.location);

            event.detailsUrl = util.getDetailsUrl(event, "event");
            event.end.dateTime = moment(event.end.dateTime).toDate();
            event.start.dateTime = moment(event.start.dateTime).toDate();

            $scope.event = event;

          });

          $scope.$on('eventSaved', function(e, event) {
            $location.path(util.getDetailsPath($scope.event, "event"))
          });

        }
    ]);
