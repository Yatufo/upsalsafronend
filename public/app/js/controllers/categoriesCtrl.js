'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('CategoriesCtrl', ['$scope', '$rootScope', '$http', 'CONFIG',
        function($scope, $rootScope, $http, CONFIG) {
            $rootScope.selectedCategories = [];

            $http.get(CONFIG.CATEGORIES_ENDPOINT).success(function(data) {
                $scope.categoryTree = data;
                setDefaultCategories(data);
            });


            var setDefaultCategories = function(categoryNode) {
                var categories = categoryNode.categories;
                if (hasCategories(categoryNode)) {
                    $rootScope.selectedCategories[categoryNode.id] = categoryNode.categories[0].id;
                    for (var category of categoryNode.categories) {
                        setDefaultCategories(category);
                    }
                }
            }

            var hasCategories = function(categoryNode) {
                return angular.isDefined(categoryNode.categories) && angular.isArray(categoryNode.categories) && categoryNode.categories.length > 0;
            }

            $scope.showSubcategories = function(childNode, parentNode) {
                var parentSelected = $rootScope.selectedCategories[parentNode.id] === childNode.id;
                return hasCategories(childNode) && parentSelected;
                            }

        }


    ]);