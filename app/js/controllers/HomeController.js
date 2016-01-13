

/* Controllers */

eventify
  .controller('HomeController', ['$scope', '$rootScope', 'AnalyticsService', 'SecurityService', HomeController]);

function HomeController($scope, $rootScope, analytics, security) {

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
