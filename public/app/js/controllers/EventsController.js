'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('EventsController', ['$scope', '$http', '$filter', '$routeParams', 'CONFIG', 'diffusionService', 'MapsService',
        function($scope, $http, $filter, $routeParams, CONFIG, diffusionService, MapsService) {

            $scope.localTime = CONFIG.TODAY;
            $scope.eventsCategories = new Set();
            $scope.selectedCategories = {};
            $scope.events = [];

            //TODO: replace this with a proper configuration depending on the environment.
            if ($routeParams.testDate) {
                $scope.localTime = new Date($routeParams.testDate);
            }


            diffusionService.onChangeCategories($scope, function(message) {
                $scope.selectedCategories = message.selected;
                filterEvents();
            });

            var filterEvents = function() {
                searchEvents(getSelecteCategoryValues(), null, function(results) {
                    $scope.events = results.events;
                    
                    if ($scope.events) {
                        populateEventsCategories();
                        populateEventsLocations();
                        diffusionService.changeEvents($scope.eventsCategories.asArray());
                    }
                })
            };

            var searchEvents = function(categories, location, callback) {
                var config = {
                    params: {
                        "categories": categories.join(",")
                    }
                }

                $http.get(CONFIG.EVENTS_ENDPOINT, config).success(function(data) {
                    callback(data);
                });

            }

            var getSelecteCategoryValues = function() {
                var categories = [];
                for (var key in $scope.selectedCategories) {
                    if ($scope.selectedCategories[key]) {
                        categories.push($scope.selectedCategories[key]);
                    }
                }
                return categories;
            }

            // gets all the unique categories that can be selected by gathering them from the filtered events.
            var populateEventsCategories = function() {
                $scope.eventsCategories.content = {};
                if (angular.isArray($scope.events)) {
                    $scope.events.forEach(function(lEvent) {
                        if (angular.isArray(lEvent.categories)) {
                            lEvent.categories.forEach(function(category) {
                                $scope.eventsCategories.add(category);
                            });
                        }
                    });
                }
            };
            var populateEventsLocations = function() {
                MapsService.reset();
                if (angular.isArray($scope.events)) {
                    $scope.events.forEach(function(lEvent) {
                        MapsService.addLocation(lEvent.location);
                    });
                }
            }
            MapsService.init();
        }


    ]);
