

/* Controllers */

eventify
    .controller('LocationsEditController', ['$scope', '$routeParams', 'Location', 'MapsService', 'UtilService', '$location',
        function($scope, $routeParams, Location, maps, util, $location) {

          Location.get({
            id: $routeParams.locationId
          }, function(location) {

            maps.init(location, 14);
            maps.addLocation(location);
            location.description = location.description || ""
            _.extend(location, util.getUrls(location, "location"))
            $scope.location = location;

          });

          $scope.$on('locationSaved', function(e, location) {
            $location.path(util.getDetailsPath($scope.location, "location"))
          });

          $scope.$on('locationCancelled', function() {
            $location.path(util.getDetailsPath($scope.location, "location"))
          });

        }
    ]);
