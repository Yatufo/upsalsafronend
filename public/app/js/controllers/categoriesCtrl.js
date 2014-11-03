'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('CategoriesCtrl', ['$scope', '$rootScope', '$http', 'CONFIG',
        function($scope, $rootScope, $http, CONFIG) {
            $rootScope.selectedCategories = [];

            $http.get(CONFIG.CATEGORIES_ENDPOINT).success(function(data) {
                $scope.categoryTree = data;
                setCategorySelectionTree($scope.categoryTree, 0);
                setDefaultValues();
            });
            var setDefaultValues = function() {
                for (var key in CONFIG.DEFAULT_CATEGORIES){
                    console.log("Setting default key: " + key);
                    $rootScope.selectedCategories[key] = CONFIG.DEFAULT_CATEGORIES[key]
                }
            }


            var setCategorySelectionTree = function(categoryNode, level) {
                categoryNode.isRoot = (level < 2);
                categoryNode.isNotRoot = !categoryNode.isRoot;

                var categories = categoryNode.categories;
                if (hasCategories(categoryNode)) {
                    for (var category of categoryNode.categories) {
                        setCategorySelectionTree(category, level + 1);
                    }
                }
            }

            var hasCategories = function(categoryNode) {
                return angular.isDefined(categoryNode.categories) && angular.isArray(categoryNode.categories) && categoryNode.categories.length > 0;
            }

            $scope.showSubcategories = function(node, parent) {
                var isSelected = $rootScope.selectedCategories[parent.id] === node.id ;
                return (hasCategories(node) && isSelected) || node.isRoot ;
            }

        }


    ]);