

/* App Module */

angular.module('eventify').directive('eventcard', function() {
    return {
        restrict: 'E',
        scope: {
            event: '=',
            city: '='
        },
        templateUrl: 'views/components/event-card.html'
    };
});
