'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('CategoriesCtrl', ['$scope', '$http', 'CONFIG', 'diffusionService',
        function($scope, $http, CONFIG, diffusionService) {


            $scope.selectedCategories = {};

            $scope.$watch('selectedCategories', function() {
                diffusionService.changeCategories($scope.selectedCategories);
            }, true);


            $http.get(CONFIG.CATEGORIES_ENDPOINT).success(function(data) {
                $scope.categories = data;
                $scope.rootCategories = data['root'];
                setDefaultValues();
            });

            $scope.restoreFilters = function() {
                console.log("reseting");
                setDefaultValues();
            }

            var setDefaultValues = function() {
                for (var key in CONFIG.DEFAULT_CATEGORIES) {
                    console.log("Setting default key: " + key);
                    $scope.selectedCategories[key] = CONFIG.DEFAULT_CATEGORIES[key];
                }
            }

            $scope.isSelected = function(category) {
                return angular.isUndefined(category.parent) || $scope.selectedCategories[category.parent] === category.id;
            }

        }


    ]);