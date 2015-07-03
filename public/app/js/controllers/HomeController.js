'use strict';

/* Controllers */

angular.module('eventifyControllers')
    .controller('HomeController', ['$scope', '$rootScope', '$http', 'AnalyticsService', 'CONFIG', HomeController]);

function HomeController($scope, $rootScope, $http, analyticsService, CONFIG) {
    $rootScope.CONFIG = CONFIG;

    if (!$rootScope.categories) {
      $http.get(CONFIG.CATEGORIES_ENDPOINT).success(function(data) {
        $rootScope.categories = data;
      });
    }

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

        $scope.city = toTitleCase(current.params.city);
        $rootScope.seo = {
            title: "Up Salsa in " + $scope.city + " : Best places to dance Salsa, Bachata, Kizomba, etc.",
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
