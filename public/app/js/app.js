'use strict';

/* App Module */

var eventify = angular.module('eventify', [
  'ngRoute',
  'ngResource',
  'eventifyControllers',
  'eventifyFilters',
  'eventifyConfig',
  'eventifyServices',
  'eventifyResources',
  'UserApp'
]);

angular.module('eventifyControllers', ['eventifyConfig', 'eventifyServices']);
angular.module('eventifyFilters', ['eventifyConfig']);
angular.module('eventifyServices', ['eventifyConfig']);
angular.module('eventifyResources', ['ngResource']);

eventify.run(function(user) {
  user.init({
    appId: '5599f2a6557ed'
  });
});

//Production configuration
eventify.config(['$compileProvider', '$locationProvider', function($compileProvider, $locationProvider) {
  $compileProvider.debugInfoEnabled(false); //Performance
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|whatsapp):/);

}]);
