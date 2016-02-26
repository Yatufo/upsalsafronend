/* Controllers */

eventify
  .controller('HomeController', ['$scope', '$rootScope', '$window', 'AnalyticsService', 'SecurityService', 'gettextCatalog', HomeController]);

function HomeController($scope, $rootScope, $window, analytics, security, i18n) {

  $scope.logout = function() {
    security.logout();
  };

  $scope.signin = function() {
    security.signin();
  }

  analytics.init();


  var supportedLanguages = ['en', 'fr']

  if (!$rootScope.currentLanguage){
    setUserLanguage();
  }

  function setUserLanguage() {
    //sets user language based on the browser
    var userLanguage = $window.navigator.userLanguage || $window.navigator.language || '';
    $rootScope.currentLanguage = userLanguage.startsWith('en') ? supportedLanguages[0] : supportedLanguages[1]
    i18n.setCurrentLanguage($rootScope.currentLanguage)
    moment.locale($rootScope.currentLanguage);
  }

  $scope.toogleLanguage = function() {
    $rootScope.currentLanguage = $rootScope.currentLanguage === supportedLanguages[0] ? supportedLanguages[1] : supportedLanguages[0];
    i18n.setCurrentLanguage($rootScope.currentLanguage);
    moment.locale($rootScope.currentLanguage);
  }


  $('#navbarCollapse').click(function() {
    if ($('#navbarCollapse').hasClass('in')) {
      $(".navbar-toggle").click();
    }
  });

};
