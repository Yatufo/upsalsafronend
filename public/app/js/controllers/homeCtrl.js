'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('HomeCtrl', ['$scope', '$rootScope', '$routeParams', '$http', 'CONFIG',
        function($scope, $rootScope, $routeParams, $http, CONFIG) {
            $rootScope.CONFIG = CONFIG;
        }
    ]);