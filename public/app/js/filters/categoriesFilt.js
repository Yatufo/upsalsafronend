'use strict';

/* Filters */

angular.module('myAppFilters')
    .filter('categories', ['CONFIG', function(cfg) {

        return function(eventsList, selectedCategories) {
            if (!angular.isArray(eventsList)) return false;
            var includedEvents = eventsList.slice(0);

            for (var key in selectedCategories) {
                var category = selectedCategories[key];

                if (angular.isDefined(category) && category != null) {

                    for (var j = includedEvents.length - 1; j >= 0; j--) {
                        var index = includedEvents[j].categories.indexOf(category);

                        if (index == -1) {
                            console.log("Envent " + includedEvents[j].summary  + " Does not have the category: " +  category);
                            includedEvents.splice(j, 1);
                        }
                    }
                }
            }

            return includedEvents;
        };
    }]);