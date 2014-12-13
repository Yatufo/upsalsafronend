'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('HomeCtrl', ['$scope', '$rootScope', '$routeParams', '$http', 'CONFIG',
        function($scope, $rootScope, $routeParams, $http, CONFIG) {
            $rootScope.CONFIG = CONFIG;
            $scope.city = $routeParams.city;
            
            $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
                $rootScope.title = 'My title';
            });
        }
    ]);