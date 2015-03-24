'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('HomeController', ['$scope', '$rootScope', 'AnalyticsService', 'CONFIG', HomeController]);

function HomeController($scope, $rootScope, analyticsService, CONFIG) {
    $rootScope.CONFIG = CONFIG;

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

        $scope.city = toTitleCase(current.params.city);
        $rootScope.seo = {
            title: "Up Salsa in " + $scope.city,
            metaDescription: "Find the best places and events to learn or dance in " + $scope.city + "any latin music like salsa, bachata, chacha, kizomba, etc."
        }

    });

    analyticsService.init();

    var toTitleCase = function(str) {
        if (str) {
            return str.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    }


    $('#navbarCollapse').click(function() {
        if ($('#navbarCollapse').hasClass('in')) {
            $(".navbar-toggle").click();
        }
    });

};
