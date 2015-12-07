

/* App Module */

eventify.directive('eventcard', function() {
    return {
        restrict: 'E',
        scope: {
            event: '=',
            city: '=',
            options: '='
        },
        templateUrl: 'views/components/event-card.html'
    };
});
