'use strict';

/* Filters */

angular.module('myAppFilters')
    .filter('categories', ['CONFIG', function(cfg) {

        return function(eventsList, selectedCategories, param) {

            if (!angular.isArray(eventsList)) return false;
            var includedEvents = eventsList.slice(0);

            for (var i = 0; i < selectedCategories.length; i++) {
                var category = selectedCategories[i][1];

                if (angular.isDefined(category) && category != null) {

                    for (var j = includedEvents.length - 1; j >= 0; j--) {
                        var index = includedEvents[j].categories.indexOf(category);

                        if (index == -1) {
                            includedEvents.splice(j, 1);
                        }
                    }
                }
            }

            return includedEvents;
        };
    }]);