'use strict';

/* Service */
var diffusionService = function($rootScope) {

  var CHANGE_CATEGORIES = "changeCategories";
  var CHANGE_EVENTS = "changeEvents";


  var changeCategories = function(selectedCategories) {
    $rootScope.$broadcast(CHANGE_CATEGORIES, {
      selected: selectedCategories
    });
  };

  var onChangeCategories = function($scope, handler) {
    $scope.$on(CHANGE_CATEGORIES, function(event, message) {
      handler(message);
    });
  };

  var changeEvents = function(eventsCategories) {
    $rootScope.$broadcast(CHANGE_EVENTS, {
      eventsCategories: eventsCategories
    });
  };

  var onChangeEvents = function($scope, handler) {
    $scope.$on(CHANGE_EVENTS, function(event, message) {
      handler(message);
    });
  };

  return {
    changeCategories: changeCategories,
    onChangeCategories: onChangeCategories,
    changeEvents: changeEvents,
    onChangeEvents: onChangeEvents
  }

};

angular.module('eventifyServices')
  .factory('diffusionService', ['$rootScope', diffusionService]);
