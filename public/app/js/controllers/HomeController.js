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

  $scope.logout = function() {
    $rootScope.auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/');
    $rootScope.$emit("authenticationChange", false);
  };

  analyticsService.init();



  $('#navbarCollapse').click(function() {
    if ($('#navbarCollapse').hasClass('in')) {
      $(".navbar-toggle").click();
    }
  });

};
