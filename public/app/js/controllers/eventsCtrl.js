'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('EventsCtrl', ['$scope', '$http', 'CONFIG',
        function($scope, $http, CONFIG) {

            $scope.localTime = CONFIG.TODAY;
            $scope.daysRange = CONFIG.DEFAULT_HAPPENSON;
            $scope.selectedCategories = [];

            $http.get(CONFIG.EVENTS_ENDPOINT).success(function(data) {
                $scope.events = data;
            });

            $http.get(CONFIG.CATEGORIES_ENDPOINT).success(function(data) {
                $scope.categories = data;
                setDefaultCategories(data);
            });


            var setDefaultCategories = function(categories) {
                if (angular.isArray(categories) && categories.length > 0) {
                    for (var i = 0; i < categories.length; i++) {
                        if (angular.isDefined(categories[i].categories)) {
                            $scope.selectedCategories[categories[i].id] = categories[i].categories[0].id;
                            setDefaultCategories(categories[i].categories);
                        }
                    }
                }
            }

        }


    ]);