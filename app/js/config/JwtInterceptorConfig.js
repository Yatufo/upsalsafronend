

var eventify = angular.module('eventify');

var TokenConfig = function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
  // We're annotating this function so that the `store` is injected correctly when this file is minified
  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    // Return the saved token
    return store.get('token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');
};

eventify.config(["authProvider", "$routeProvider", "$httpProvider", "jwtInterceptorProvider", TokenConfig]);
