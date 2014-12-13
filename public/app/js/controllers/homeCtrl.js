'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('HomeCtrl', ['$scope', '$rootScope', '$routeParams', '$http', 'CONFIG',
        function($scope, $rootScope, $routeParams, $http, CONFIG) {
            $rootScope.CONFIG = CONFIG;
            
            $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
                $scope.city = current.params.city;
            });
        }
    ]);