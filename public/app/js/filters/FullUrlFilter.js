'use strict';

/* Filters */

angular.module('myAppFilters')
    .filter('fullUrl', ['$location', function($location) {
        return function(partialPath) {
            return $location.absUrl().replace($location.path(), partialPath);
        };
    }]);
