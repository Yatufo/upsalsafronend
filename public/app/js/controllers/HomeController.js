'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('HomeController', ['$scope', '$rootScope', '$routeParams', '$http', 'CONFIG',
        function($scope, $rootScope, $routeParams, $http, CONFIG) {
            $rootScope.CONFIG = CONFIG;

            $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
                $scope.city = toTitleCase(current.params.city);
                $scope.eventType = current.params.eventType;
            });

            var toTitleCase = function(str) {
                if (str) {
                    return str.replace(/\w\S*/g, function(txt) {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                }
            }
        }
    ]);
