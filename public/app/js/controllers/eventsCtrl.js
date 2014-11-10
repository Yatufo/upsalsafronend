'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('EventsCtrl', ['$scope', '$http', '$filter', 'CONFIG', 'diffusionService',
        function($scope, $http, $filter, CONFIG, diffusionService) {

            $scope.localTime = CONFIG.TODAY;
            $scope.daysRange = CONFIG.DEFAULT_HAPPENSON;

            $http.get(CONFIG.EVENTS_ENDPOINT).success(function(data) {
                $scope.events = data;
                $scope.filteredEvents = data;
            });


            diffusionService.onChangeCategories($scope, function(message) {
                // happensOn:selectedCategories['happenson']:localTime | categories:selectedCategories 
				$scope.filteredEvents = $filter('happensOn')($scope.events, message.selected['happenson'], $scope.localTime);
				$scope.filteredEvents = $filter('categories')($scope.filteredEvents, message.selected);
            });
        }


    ]);