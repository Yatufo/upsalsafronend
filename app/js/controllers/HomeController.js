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


  var supportedLanguages = ['en', 'fr_CA']

  if (!$scope.currentLanguage){
    setUserLanguage();    
  }

  function setUserLanguage() {
    //sets user language based on the browser
    var userLanguage = $window.navigator.userLanguage || $window.navigator.language || '';
    $scope.currentLanguage = userLanguage.startsWith('en') ? supportedLanguages[0] : supportedLanguages[1]
    i18n.setCurrentLanguage($scope.currentLanguage)
  }

  $scope.toogleLanguage = function() {
    $scope.currentLanguage = $scope.currentLanguage === supportedLanguages[0] ? supportedLanguages[1] : supportedLanguages[0];
    i18n.setCurrentLanguage($scope.currentLanguage);
  }


  $('#navbarCollapse').click(function() {
    if ($('#navbarCollapse').hasClass('in')) {
      $(".navbar-toggle").click();
    }
  });

};
