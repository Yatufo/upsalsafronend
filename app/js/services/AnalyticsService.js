

/* Service */
var AnalyticsService = function ($rootScope, $window, $location) {

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

eventify
    .factory('AnalyticsService', ['$rootScope', '$window', '$location', AnalyticsService]);
