

/* App Module */

angular.module('eventify').directive('sharesocial', ["$window", "AnalyticsService", function($window, analyticsService) {
  return {
    restrict: 'E',
    scope: {
      message: '=',
      url: '='
    },
    controller: ['$scope', function($scope) {
      $scope.facebookUrl = "https://www.facebook.com/sharer/sharer.php?&u=" + encodeURIComponent($scope.url);
      $scope.twitterUrl = "https://twitter.com/intent/tweet?text=" + $scope.message + "&url=" + encodeURIComponent($scope.url);
      $scope.whatsappUrl = "whatsapp://send?text=" + $scope.message + " " + $scope.url;

      $scope.share = function(shareUrl) {
        $window.open(shareUrl, 'sharesocial', 'height=450, width=550, top=' +
          ($window.innerHeight / 2 - 275) + ', left=' + ($window.innerWidth / 2 - 225) +
          ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

        analyticsService.track({
          category: 'social',
          action: 'share',
          url: $scope.url
        });
      };
    }],
    templateUrl: 'views/components/share-social.html'
  };
}]);
