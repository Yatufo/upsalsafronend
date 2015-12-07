

/* Controllers */

eventify
  .controller('HomeController', ['$scope', '$rootScope', 'AnalyticsService', 'CONFIG', 'CategoriesResource', 'SecurityService', HomeController]);

function HomeController($scope, $rootScope, analytics, CONFIG, CategoriesResource, security) {
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
    security.logout();
  };

  $scope.signin = function() {
    security.signin();
  }

  analytics.init();



  $('#navbarCollapse').click(function() {
    if ($('#navbarCollapse').hasClass('in')) {
      $(".navbar-toggle").click();
    }
  });

};
