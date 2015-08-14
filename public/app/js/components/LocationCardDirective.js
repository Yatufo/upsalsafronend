

/* App Module */

angular.module('eventify').directive('locationcard', function() {
    return {
        restrict: 'E',
        replace : true,
        scope: {
            location: '=',
            city: '='
        },
        templateUrl: 'views/components/location-card.html'
    };
});
