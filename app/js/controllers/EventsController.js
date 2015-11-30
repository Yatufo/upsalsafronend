/* Controllers */

eventify
  .controller('EventsController', ['$scope', '$rootScope', '$window', '$filter', '$routeParams', 'CONFIG', 'EventsResource', 'MapsService',
    function($scope, $rootScope, $window, $filter, $routeParams, CONFIG, Event, maps) {

      var SPLIT_PARAM = "-";
      $scope.localTime = CONFIG.TODAY;
      $scope.selectedCategories = [];
      $scope.events = [];
      $scope.locations = [];
      $scope.loading = true;

      if ($routeParams.categories) {
        $scope.categories = $routeParams.categories.split(SPLIT_PARAM);
      }


      $scope.search = function() {

        Event.query({categories: $scope.categories.join(",")}, function(events) {
          $scope.events = events;

          $scope.events.forEach(function(event) {
            event.detailsUrl = $window.location.origin + '/' + $rootScope.city + '/events/' + event.id;
          });

          $scope.locations = $scope.events.map(function(event) {
            return event.location;
          })

          reloadMap($scope.locations);
          $scope.loading = false;
        });
      };

      //TODO: Reuse this code which is also in the locations
      $scope.isMobile = maps.isMobile();
      $scope.isListVisible = true;
      $scope.isMapVisible = !($scope.isMobile && $scope.isListVisible)
      $scope.canToggleView = $scope.isMobile;
      $scope.isMapLoaded = false;

      function reloadMap(locations, forceReload) {
        if ($scope.isMapVisible && (forceReload || !$scope.isMapLoaded)) {
          maps.init();
          locations.forEach(function(location) {
            maps.addLocation(location);
          });
          $scope.isMapLoaded = true;
        }
      }

      $scope.toogleView = function() {

        analytics.track({
          category: 'usage',
          action: 'toogleMap',
          url: $window.location
        });

        $scope.isMapVisible = !$scope.isMapVisible;
        $scope.isListVisible = !$scope.isListVisible;


        reloadMap($scope.locations);
      };

      $scope.highlightLocation = function(location) {
        maps.highlightLocation(location);
      };


      $scope.search();
    }


  ]);
