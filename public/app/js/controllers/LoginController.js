

/* Controllers */
var LoginController = function($scope, $http, auth, store, $location) {
  $scope.login = function() {
    auth.signin({}, function(profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/');
    }, function() {
      // Error callback
    });
  };
};
angular.module('eventifyControllers')
  .controller('LoginController', ['$scope', '$http', 'auth', 'store', '$location', LoginController]);
