'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('EventsCtrl', ['$scope', '$http', '$filter', '$routeParams', 'CONFIG', 'diffusionService', 'MapsService',
        function($scope, $http, $filter, $routeParams, CONFIG, diffusionService, MapsService) {

            $scope.localTime = CONFIG.TODAY;
            $scope.eventsCategories = new Set();
            $scope.selectedCategories = {};
            $scope.filteredEvents = [];

            //TODO: replace this with a proper configuration depending on the environment.
            if ($routeParams.testDate) {
                $scope.localTime = new Date($routeParams.testDate);
            }

            $http.get(CONFIG.EVENTS_ENDPOINT).success(function(data) {
                $scope.events = data;
                $scope.filteredEvents = data;

                $scope.filterEvents();
            });


            diffusionService.onChangeCategories($scope, function(message) {
                $scope.selectedCategories = message.selected;
                $scope.filterEvents();
            });

            $scope.filterEvents = function() {
                $scope.filteredEvents = $filter('happensOn')($scope.events, $scope.selectedCategories['happenson'], $scope.localTime);
                $scope.filteredEvents = $filter('categories')($scope.filteredEvents, $scope.selectedCategories);

                populateEventsCategories();
                populateEventsLocations();
                diffusionService.changeEvents($scope.eventsCategories.asArray());
            };

            // gets all the unique categories that can be selected by gathering them from the filtered events.
            var populateEventsCategories = function() {
                $scope.eventsCategories.content = {};
                if (angular.isArray($scope.filteredEvents)) {
                    $scope.filteredEvents.forEach(function(lEvent) {
                        if (angular.isArray(lEvent.categories)) {
                            lEvent.categories.forEach(function(category) {
                                $scope.eventsCategories.add(category);
                            });
                        }
                    });
                }
            };
            var populateEventsLocations = function() {
                if (angular.isArray($scope.filteredEvents)) {
                    $scope.filteredEvents.forEach(function(lEvent) {
                        MapsService.addLocation(lEvent.location);
                    });
                }
            }

            MapsService.init();
        }


    ]);
