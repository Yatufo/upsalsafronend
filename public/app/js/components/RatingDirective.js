'use strict';

/* App Module */

angular.module('eventify').directive('rating', function() {
    return {
        restrict: 'E',
        scope: {
            location: '=',
        },
        templateUrl: 'views/components/rating.html'
    };
});
