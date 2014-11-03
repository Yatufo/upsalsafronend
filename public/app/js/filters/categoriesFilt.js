'use strict';

/* Filters */

angular.module('myAppFilters')
    .filter('categories', ['CONFIG', function(cfg) {

        return function(eventsList, selectedCategories) {
            if (!angular.isArray(eventsList)) return false;
            var includedEvents = eventsList.slice(0);

            for (var key in selectedCategories) {
                var category = selectedCategories[key];

                if (key !== "happenson" && angular.isDefined(category) && category !== null) {
                    for (var j = includedEvents.length - 1; j >= 0; j--) {
                        var index = -1;
                        if (angular.isArray(includedEvents[j].categories)) {
                            includedEvents[j].categories.indexOf(category);
                        }

                        if (index == -1) {
                            includedEvents.splice(j, 1);
                        }
                    }
                }
            }

            return includedEvents;
        };
    }]);