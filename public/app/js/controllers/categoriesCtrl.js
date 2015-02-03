'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('CategoriesCtrl', ['$scope', '$http', '$routeParams', 'CONFIG', 'diffusionService',
        function($scope, $http, $routeParams, CONFIG, diffusionService) {


            $scope.isCollapsed = false;
            $scope.selectedCategories = {};
            $scope.categories = {};
            $scope.root = {
                categories: []
            };
            $scope.reloadCategories = false;

            $http.get(CONFIG.CATEGORIES_ENDPOINT).success(function(data) {
                $scope.categories = data;
                $scope.root = data['root'];
                setDefaultValues();
            });

            var setDefaultValues = function() {
                for (var key in CONFIG.DEFAULT_CATEGORIES) {
                    $scope.changeSelectCategory(key, CONFIG.DEFAULT_CATEGORIES[key]);
                }

                //the event type selected by the user
                if ($routeParams.eventType) {
                    $scope.changeSelectCategory("eventtype", $routeParams.eventType);
                }
            };

            $scope.changeSelectCategory = function(parentId, childId) {
                $scope.selectedCategories[parentId] = ($scope.selectedCategories[parentId] !== childId ? childId : null);
                $scope.changeRootCategory(parentId, childId);

                diffusionService.changeCategories($scope.selectedCategories);
                changeCategoriesStatus();
            };

            $scope.changeRootCategory = function(parentId, childId) {
                if (!childId) return;

                var child = $scope.categories[childId];
                var index = $scope.root.categories.indexOf(child);
                var isSelected = $scope.selectedCategories[parentId] === childId;
                var isRoot = index >= 0;

                if (isSelected && !isRoot) {
                    $scope.root.categories.push(child);
                } else {
                    $scope.root.categories.splice(index, 1);
                    // Since it's not root anymore it can't have a selected child
                    $scope.changeSelectCategory(childId, null);
                }
            }

            $scope.isGroupVisible = function(category) {
                return angular.isUndefined(category.parent) || $scope.selectedCategories[category.parent] === category.id;
            };


            diffusionService.onChangeEvents($scope, function(message) {
                $scope.eventsCategories = message.eventsCategories;
                changeCategoriesStatus();
            });

            var changeCategoriesStatus = function() {

                $scope.root.categories.forEach(function(root) {

                    var visibleCount = 0;
                    $scope.categories[root.id].categories.forEach(function(category) {
                        updateCategoryStatus(category);

                        if (category.visible) {
                            visibleCount++;
                        }
                    });

                    root.visible = updateRootCategoryStatus(root, visibleCount);

                });
            }


            var updateRootCategoryStatus = function(category, count) {
                var isChildToggled = angular.isString($scope.selectedCategories[category.id]);
                var isVisibleChildren = count > 1;

                return isChildToggled || isVisibleChildren;
            }


            var updateCategoryStatus = function(category) {

                category.selected = $scope.selectedCategories[category.parent] === category.id;

                var isHappensOn = category.parent === "happenson"
                var isContainedInEvents = $scope.eventsCategories.indexOf(category.id) != -1;
                var isNoSiblingToggled = !angular.isString($scope.selectedCategories[category.parent]);

                if (category.selected && !isHappensOn && !isContainedInEvents) {
                    $scope.selectedCategories[category.parent] = null;
                }

                category.visible = (isHappensOn || isContainedInEvents) && (isNoSiblingToggled || category.selected);
                category.disabled = !(isHappensOn || isContainedInEvents);
            }

        }


    ]);
