'use strict';

/* Service */

angular.module('myAppServices')
    .factory('AnalyticsService', ['$rootScope', '$window', '$location', AnalyticsService]);

function AnalyticsService($rootScope, $window, $location) {

    var service = {
        init: function() {
            $rootScope.$on('$viewContentLoaded', function(event) {
                $window.ga('send', 'pageview', {
                    page: $location.url()
                });
            });
        },
        track: function(trackInfo) {
            ga('send', 'event', trackInfo.category, trackInfo.action, {'page': trackInfo.url});
        }
    };

    return service;
};
