

/* App Module */

var eventify = angular.module('eventify', [
  'ngRoute',
  'ngResource',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'infinite-scroll',
  'eventifyControllers',
  'eventifyFilters',
  'eventifyConfig',
  'eventifyServices',
  'eventifyResources',
  'eventifyTemplates'
]);


eventify.config(["authProvider", function (authProvider) {
  authProvider.init({
    domain: 'marq.auth0.com',
    clientID: 'DRwECJSJ3um1XVaET9b88YRvvY0STWbE'
  });
}]).run(["auth", function(auth) {
  auth.hookEvents();
}]);


angular.module('eventifyControllers', ['eventifyConfig', 'eventifyServices']);
angular.module('eventifyFilters', ['eventifyConfig']);
angular.module('eventifyServices', ['eventifyConfig']);
angular.module('eventifyResources', ['ngResource']);


//Production configuration
eventify.config(['$compileProvider', '$locationProvider', function($compileProvider, $locationProvider) {
  $compileProvider.debugInfoEnabled(false); //Performance
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|whatsapp):/);

}]);

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
