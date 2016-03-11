/* Controllers */

eventify
  .controller('EventDetailsController', ['$scope', '$routeParams', '$location', 'EventsResource', 'MapsService', 'UtilService',
    function($scope, $routeParams, $location, Event, maps, util) {

      $scope.event = {};

      Event.get({
        id: util.stripIdFromURI($routeParams.eventId)
      }, function(event) {

        if (event.id) {
          _.extend(event, util.getUrls(event, "event"))
          util.changeSEOtags(event, "event");

          event.location.id = event.id;
          event.location.name = event.name;
          event.location.detailsUrl = event.detailsUrl;

          maps.init(event.location, 14);
          maps.addLocation(event.location);


          $scope.event = event;
        } else {
          $location.path("/")
        }
      });

    }
  ]);
