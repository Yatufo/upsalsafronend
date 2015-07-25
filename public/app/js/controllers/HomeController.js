'use strict';

/* Controllers */

angular.module('eventifyControllers')
  .controller('HomeController', ['$scope', '$rootScope', 'AnalyticsService', 'CONFIG', 'CategoriesResource', 'store', '$location', HomeController]);

function HomeController($scope, $rootScope, analyticsService, CONFIG, CategoriesResource, store, $location) {
  $rootScope.CONFIG = CONFIG;

  if (!$rootScope.categories) {
    $rootScope.categories = [];
    CategoriesResource.query({}, function(categories) {
      var results = {};
      categories.forEach(function(category) {
        results[category.id] = category;
      });

      $rootScope.categories = results;
    });
  };

  $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

    $scope.city = toTitleCase(current.params.city);
    $rootScope.seo = {
      title: "Up Salsa in " + $scope.city + " : Best places to dance Salsa, Bachata, Kizomba, etc.",
      metaDescription: "Find the best places and events to learn or dance in " + $scope.city + "any latin music like salsa, bachata, chacha, kizomba, etc."
    }

  });

  $scope.logout = function() {
    $rootScope.auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/');
  };

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
