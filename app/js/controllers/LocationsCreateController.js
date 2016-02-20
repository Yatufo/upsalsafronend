/* Controllers */
var LocationsCreateController =
  function($scope, Location, maps, util, $location) {

    $scope.isMobile = maps.isMobile();
    $scope.isListVisible = true;
    $scope.isMapVisible = !($scope.isMobile && $scope.isListVisible)


    $scope.$on('locationSaved', function(e, location) {
      $location.path(util.getDetailsPath(location, "location"))
    });

    $scope.$on('locationCancelled', function() {
      $location.path("/")
    });


  };

eventify.controller('LocationsCreateController',
['$scope', 'Location', 'MapsService', 'UtilService', '$location', LocationsCreateController]);
