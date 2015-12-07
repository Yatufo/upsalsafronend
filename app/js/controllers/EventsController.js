/* Controllers */

eventify
  .controller('EventsController', ['$scope', '$window', '$filter', '$routeParams', 'CONFIG', 'EventsResource', 'MapsService', 'UtilService',
    function($scope, $window, $filter, $routeParams, conf, Event, maps, util) {

      var SPLIT_PARAM = "-";
      $scope.localTime = conf.TODAY;
      $scope.selectedCategories = [];
      $scope.events = [];
      $scope.locations = [];
      $scope.loading = true;

      if ($routeParams.categories) {
        $scope.categories = $routeParams.categories.split(SPLIT_PARAM);
      }


      $scope.search = function() {

        Event.query({categories: $scope.categories.join(conf.ARRAY_PARAM_SEPARATOR)}, function(events) {
          $scope.events = events;

          $scope.events.forEach(function(event) {
            event.detailsUrl = util.getDetailsUrl(event, "event");
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
