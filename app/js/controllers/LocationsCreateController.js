

/* Controllers */

eventify
    .controller('LocationsCreateController', ['$scope', '$routeParams', 'EventsResource', 'MapsService', 'UtilService', '$location',
        function($scope, Location, maps, util, $location) {

          $scope.addressCompleted = function(data) {
            $scope.address = data;
          }


          $scope.$on('location', function(e, location) {
            $location.path(util.getDetailsPath($scope.location, "location"))
          });

        }
    ]);
