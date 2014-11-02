'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('HomeCtrl', ['$scope', '$rootScope', '$http', 'CONFIG',
        function($scope, $rootScope, $http, CONFIG) {
        	console.log("setting up home");
            $rootScope.CONFIG = CONFIG;
        }
    ]);