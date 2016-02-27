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


  var ENGLISH = 'en';
  var FRENCH = 'fr';

  if (!$rootScope.currentLanguage){
    setUserLanguage();
  }

  function setUserLanguage() {
    //sets user language based on the browser
    var userLanguage = $window.navigator.userLanguage || $window.navigator.language || '';
    var isEnglish = _.startsWith(userLanguage, 'en');
    $rootScope.currentLanguage = isEnglish ? ENGLISH : FRENCH
    $scope.otherLanguage = isEnglish ?  FRENCH : ENGLISH

    i18n.setCurrentLanguage($rootScope.currentLanguage)
    moment.locale($rootScope.currentLanguage);
  }

  $scope.toogleLanguage = function() {
    var swap = $rootScope.currentLanguage
    $rootScope.currentLanguage = $scope.otherLanguage;
    $scope.otherLanguage = swap;
    
    i18n.setCurrentLanguage($rootScope.currentLanguage);
    moment.locale($rootScope.currentLanguage);
  }


  $('#navbarCollapse').click(function() {
    if ($('#navbarCollapse').hasClass('in')) {
      $(".navbar-toggle").click();
    }
  });

};
