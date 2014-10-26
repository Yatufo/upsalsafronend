'use strict';

/* Filters */

var myAppFilters = angular.module('myAppFilters', ['myAppConfig']);

myAppFilters.filter('happensOn', ['CONFIG', function(cfg) {

    return function(array, query, localTime) {
        if (!angular.isArray(array)) return false;

        //Production Behavior: Uses the time id the client if there is no testing going on.
        if (angular.isUndefined(localTime)) {
            console.log('Using the browsers local time');
            localTime = new Date();
        }
        var includedEvents = [];

        for (var event of array) {

            if (angular.isUndefined(event.start) || angular.isUndefined(event.start.dateTime)) {
                console.log('Event without a start date - Ommiting');
                continue;
            }

            var startDate = new Date(event.start.dateTime);
            var timeDiff = startDate - localTime;
            var included = false;

            // The event belongs in this week if it's contained in the next seven days.

            switch (query) {
                case "today":
                    //Includes happening now events
                    var happeningNow = !(angular.isUndefined(event.end) || angular.isUndefined(event.end.dateTime))
                        && (timeDiff < 0 && new Date(event.end.dateTime) - localTime > 0) ;

                    included = (timeDiff >= 0 && timeDiff < cfg.ONE_DAY_MILIS) || happeningNow
                    break;
                case "tomorrow":
                    included = (timeDiff >= cfg.ONE_DAY_MILIS && timeDiff < 2 * cfg.ONE_DAY_MILIS)
                    break;
                case "weekend":
                    included = (timeDiff >= 0 && timeDiff < 7 * cfg.ONE_DAY_MILIS && cfg.WEEKEND_DAYS.indexOf(startDate.getDay()) > -1)
                    break;
                case "week":
                    included = (timeDiff >= 0 && timeDiff < 7 * cfg.ONE_DAY_MILIS && cfg.WEEK_DAYS.indexOf(startDate.getDay()) > -1)
                    break;
                default:
                    included = false;
                    break;
            }

            if (included) {
                includedEvents.push(event);
            }
        }

        return includedEvents;
    };
}]);