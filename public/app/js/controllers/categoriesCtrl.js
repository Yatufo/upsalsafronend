'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('CategoriesCtrl', ['$scope', '$rootScope', '$http', 'CONFIG',
        function($scope, $rootScope, $http, CONFIG) {
            $rootScope.selectedCategories = [];

            $http.get(CONFIG.CATEGORIES_ENDPOINT).success(function(data) {
                $scope.categories = data;
                $scope.rootCategories = data['root'];
                setDefaultValues();
            });

            var setDefaultValues = function() {
                for (var key in CONFIG.DEFAULT_CATEGORIES) {
                    console.log("Setting default key: " + key);
                    $rootScope.selectedCategories[key] = CONFIG.DEFAULT_CATEGORIES[key]
                }
            }

            $scope.isSelected = function(category) {
                return angular.isUndefined(category.parent) || $rootScope.selectedCategories[category.parent] === category.id;
            }

        }


    ]);