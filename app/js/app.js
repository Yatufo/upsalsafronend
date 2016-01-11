

/* App Module */

var eventify = angular.module('eventify', [
  'ngRoute',
  'ngResource',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'infinite-scroll',
  'ngFileUpload',
  'ui.bootstrap.datetimepicker',
  'smartArea',
  'internationalPhoneNumber'
]);

eventify.config(["authProvider", function (authProvider) {
  authProvider.init({
    domain: 'upsalsa.auth0.com',
    clientID: 'zNhY5wesWo8iVMsdRYbM6VVXzeMjts0x'
  });
}]).run(["auth", function(auth) {
  auth.hookEvents();
}]);


//Production configuration
eventify.config(['$compileProvider', '$locationProvider', function($compileProvider, $locationProvider) {
  $compileProvider.debugInfoEnabled(false); //Performance
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|tel|whatsapp):/);

}]);

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
