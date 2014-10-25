'use strict';

/* Controllers */

var myAppFilters = angular.module('myAppFilters', []);

myAppFilters.filter('happensOn', function() {
    return function(array, query, localTime) {
        if (!angular.isArray(array)) return false;
        
        //Production Behavior: Uses the time id the client if there is no testing going on.
        if (angular.isUndefined(localTime)){
            console.log('Using the browsers local time');
            localTime = new Date();
        }

        console.log('At least calling the filter ' + localTime);
        var includedEvents = [];

        for (var event of array) {

            var MINIMUM = 0;
            var ONE_DAY_MILIS = 86400000;
            var WEEKEND_DAYS = [5, 6, 0];
            var WEEK_DAYS = [1, 2, 3, 4];
            var eventDate = new Date(event.start.dateTime);
            var timeDiff = eventDate - localTime;
            var included = false;


            switch (query) {
                case "today":
                    included = (timeDiff > MINIMUM && timeDiff < ONE_DAY_MILIS)
                    break;
                case "tomorrow":
                    included = (timeDiff > ONE_DAY_MILIS && timeDiff < 2 * ONE_DAY_MILIS)
                    break;
                case "weekend":
                    included = (timeDiff > ONE_DAY_MILIS && timeDiff < 7 * ONE_DAY_MILIS && WEEKEND_DAYS.indexOf(eventDate.getDay()) > -1)
                    break;
                case "week":
                    included = (timeDiff > ONE_DAY_MILIS && timeDiff < 3 * ONE_DAY_MILIS && WEEKEND_DAYS.indexOf(eventDate.getDay()) > -1)
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
});