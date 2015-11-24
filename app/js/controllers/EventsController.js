/* Controllers */

angular.module('eventifyControllers')
  .controller('EventsController', ['$scope', '$http', '$filter', '$routeParams', 'CONFIG', 'MapsService',
    function($scope, $http, $filter, $routeParams, CONFIG, maps) {

      var SPLIT_PARAM = "-";
      $scope.localTime = CONFIG.TODAY;
      $scope.selectedCategories = [];
      $scope.events = [];
      $scope.loading = true;

      if ($routeParams.categories) {
        $scope.selectedCategories = $routeParams.categories.split(SPLIT_PARAM);
      }

      searchEvents();

      function searchEvents() {
        var config = {
          params: {
            "categories": $scope.selectedCategories.join(",")
          }
        };

        $http.get(CONFIG.EVENTS_ENDPOINT, config).success(function(data) {
          $scope.events = [{
            "_id": "54fc8442aacad0030040ca8b",
            "title": "Club /practice nights / Soirée de pratique 9pm-3am",
            "location": {
              "_id": {
                "$oid": "55c15d88a42c1f83f204e006"
              },
              "id": "salsaxtaze",
              "name": "Salsa Xtaze",
              "address": "5425, rue de Bordeaux,Loft 255,Montréal QC H2H 2P9 ",
              "url": "http://www.salsaxtaze.ca/",
              "phone": "5148913612",
              "ratings": [],
              "coordinates": {
                "latitude": 45.539399,
                "longitude": -73.582811
              },
              "__v": 0
            },
            "sequence": 1,
            "categories": [
              "kizomba",
              "bachata",
              "salsa",
              "chacha",
              "party",
              "intermediate"
            ],
            "end": {
              "dateTime": "2014-06-15T07:00:00.000Z"
            },
            "start": {
              "dateTime": "2014-06-15T01:00:00.000Z"
            }
          }];

          showEventsInMap($scope.events);
          $scope.loading = false;
        });

      };




      var showEventsInMap = function(events) {
        maps.reset();
        if (_.isArray(events)) {
          events.forEach(function(lEvent) {
            maps.addLocation(lEvent.location);
          });
        }
      };

      $scope.highlightLocation = function(location) {
        maps.highlightLocation(location);
      };


      maps.init();
    }


  ]);
