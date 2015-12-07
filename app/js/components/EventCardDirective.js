

/* App Module */

eventify.directive('eventcard', function() {
    return {
        restrict: 'E',
        scope: {
            event: '=',
            options: '='
        },
        templateUrl: 'views/components/event-card.html'
    };
});
