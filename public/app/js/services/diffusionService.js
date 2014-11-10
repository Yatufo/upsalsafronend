'use strict';

/* Service */

angular.module('myAppServices')
    .factory('diffusionService', ['$rootScope',
        function($rootScope) {

            var CHANGE_CATEGORIES = "changeCategories";


            var changeCategories = function(selectedCategories) {
                $rootScope.$broadcast(CHANGE_CATEGORIES, {
                    selected: selectedCategories
                });
            };

            var onChangeCategories = function($scope, handler) {
                $scope.$on(CHANGE_CATEGORIES, function(event, message) {
                    console.log('Handling the messgae' + JSON.stringify(message.selected));
                    handler(message);
                });
            };


            return {
                changeCategories: changeCategories,
                onChangeCategories: onChangeCategories
            }

        }
    ]);