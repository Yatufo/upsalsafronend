'use strict';

/* Controllers */

var myAppControllers = angular.module('myApp.controllers', ['myApp.config']);

myAppControllers.controller('EventsCtrl', ['$scope', '$http', 'CONFIG',
    function($scope, $http, CONFIG) {

        $scope.localTime = new Date(CONFIG.TODAY);

        console.log($scope.localTime);
        $http.get(CONFIG.EVENTS_ENDPOINT).success(function(data) {
            console.log(JSON.stringify(data));
            $scope.events = data;
        });



        $scope.datePosition = function(query) {
            return function(event) {
                const MINIMUM = 0;
                const ONE_DAY_MILIS = 86400000;
                const WEEKEND_DAYS = [5,6,0];
                var eventDate = new Date(event.start.dateTime);
                var timeDiff = eventDate - $scope.localTime;

                if (angular.equals('today', query)) {
                    return (timeDiff > MINIMUM && timeDiff < ONE_DAY_MILIS)
                } else if (angular.equals('tomorrow', query)) {
                    return (timeDiff > ONE_DAY_MILIS && timeDiff < 2 * ONE_DAY_MILIS)
                } else if (angular.equals('weekend', query)) {
                    console.log(eventDate.getDay());
                    return (timeDiff > ONE_DAY_MILIS && timeDiff < 7 * ONE_DAY_MILIS 
                        && WEEKEND_DAYS.indexOf(eventDate.getDay()) > -1)
                }




                return false;
            }
        };

    }
]);