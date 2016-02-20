/* Controllers */

eventify
  .controller('LocationDetailsController', ['$rootScope', '$scope', '$routeParams', 'Location', 'MapsService', 'RatingService', 'CategoryService', 'UtilService',
    function($rootScope, $scope, $routeParams, Location, maps, ratingService, categoryService, util) {

      $scope.isMobile = maps.isMobile();
      $scope.isListVisible = true;
      $scope.isMapVisible = !($scope.isMobile && $scope.isListVisible)


      var resetSummaries = function() {
        categoryService.getCategories().then(function(categories) {
          if ($scope.location) {
            $scope.location.summaries = ratingService.generateSummaries($scope.location, categories);
          }
        });
      };

      $scope.$on('eventSaved', function(e, event) {
        if (event) {
          $scope.events.push(event);
        }
      });

      $scope.$watch('location', function() {
        resetSummaries();
      });

      $rootScope.$watch('user.ratings', function(ratings) {
        if(ratings){
          resetSummaries();
        }
      });


      Location.get({
        id: $routeParams.locationId
      }, function(location) {
        maps.init(location, 14);
        maps.addLocation(location);
        location.showComments = true;

        _.extend(location, util.getUrls(location, "location"));
        util.changeSEOtags(location, "location");
        $scope.location = location;
      });

      Location.getEvents({
        locationId: $routeParams.locationId,
        categories: []
      }, function(events) {
        $scope.events = events || [];
        $scope.events.forEach(function(event) {
          _.extend(event, util.getUrls(event, "event"))

          event.location.id = event.id;
          event.location.name = event.name;
          event.location.detailsUrl = event.detailsUrl;

          maps.addLocation(event.location);
        })
      })


      $scope.highlightLocation = function(location) {
        maps.highlightLocation(location);
      };

      window.scrollTo(0, 0);
    }
  ]);
