

/* Controllers */
var CategoriesController = function($scope, $http, $routeParams, CONFIG, diffusionService) {


    $scope.isCollapsed = false;
    $scope.selectedCategories = {};
    $scope.root = {
        categories: []
    };
    $scope.reloadCategories = false;
    $scope.selectedEventtype = {};

    if (!$scope.categories) {
        $http.get(CONFIG.CATEGORIES_ENDPOINT).success(function(data) {
            $scope.categories = data;
            $scope.root = data.root;
            setDefaultValues();
        });
    }

    var setDefaultValues = function() {
        $scope.selectedCategories = {};
        for (var key in CONFIG.DEFAULT_CATEGORIES) {
            toogleCategory(key, CONFIG.DEFAULT_CATEGORIES[key]);
        }

        //the event type selected by the user
        if ($routeParams.categories) {
            //I don't know why this star is being passed, so I remove it.
            var codes = $routeParams.categories.replace('*', '').split('/');
            codes.forEach(function(childId) {
                toogleCategory(getParentCategoryCode(childId), childId);
            });
        }

        diffusionService.changeCategories($scope.selectedCategories);
    };

    var getParentCategoryCode = function(childId) {
        if ($scope.categories) {
            var child = $scope.categories[childId];
            if (child) {
                return child.parent;
            }
        }
        return null;
    };


    $scope.changeSelectCategory = function(parentId, childId) {
        toogleCategory(parentId, childId);
        diffusionService.changeCategories($scope.selectedCategories);
    };

    var toogleCategory = function(parentId, childId) {
        $scope.selectedCategories[parentId] = ($scope.selectedCategories[parentId] !== childId ? childId : null);
        toogleRootCategory(parentId, childId);
        if (parentId == 'eventtype') {
            $scope.selectedEventtype = $scope.categories[$scope.selectedCategories[parentId]];
        }
    };

    var toogleRootCategory = function(parentId, childId) {
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
            toogleCategory(childId, null);
        }
    };

    diffusionService.onChangeEvents($scope, function(message) {
        $scope.eventsCategories = (message.eventsCategories ? message.eventsCategories : []);
        changeCategoriesStatus();
    });

    var changeCategoriesStatus = function() {

        $scope.root.categories.forEach(function(parent) {

            var visibleCount = 0;
            $scope.categories[parent.id].categories.forEach(function(category) {
                updateCategoryStatus(category);

                if (category.visible) {
                    visibleCount++;
                }
            });

            parent.visible = updateRootCategoryStatus(parent, visibleCount);

        });
    };


    var updateRootCategoryStatus = function(category, count) {
        var isEventType = category.id === "eventtype";
        var isChildToggled = angular.isString($scope.selectedCategories[category.id]);
        var isVisibleChildren = count >= 1;

        return (isChildToggled || isVisibleChildren) && !isEventType;
    };


    var updateCategoryStatus = function(category) {

        category.selected = $scope.selectedCategories[category.parent] === category.id;

        var isHappensOn = category.parent === "happenson";
        var isContainedInEvents = $scope.eventsCategories.indexOf(category.id) != -1;
        var isNoSiblingToggled = !angular.isString($scope.selectedCategories[category.parent]);

        category.visible = (isHappensOn || isContainedInEvents) && (isNoSiblingToggled || category.selected);
        category.disabled = !(isHappensOn || isContainedInEvents);


    };

}



angular.module('eventifyControllers')
    .controller('CategoriesController', ['$scope', '$http', '$routeParams', 'CONFIG', 'diffusionService', CategoriesController]);
