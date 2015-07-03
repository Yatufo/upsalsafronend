'use strict';

/* App Module */

angular.module('eventify').directive('locationcard', function() {
    return {
        restrict: 'E',
        scope: {
            location: '=',
            city: '='
        },
        templateUrl: 'views/components/location-card.html'
    };
});
