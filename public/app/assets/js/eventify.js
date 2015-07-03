'use strict';

/* App Module */

var eventify = angular.module('eventify', [
    'ngRoute',
    'eventifyControllers',
    'eventifyFilters',
    'eventifyConfig',
    'eventifyServices'
]);

angular.module('eventifyControllers', ['eventifyConfig', 'eventifyServices']);
angular.module('eventifyFilters', ['eventifyConfig']);
angular.module('eventifyServices', ['eventifyConfig']);

//Production configuration
eventify.config(['$compileProvider', '$locationProvider', function($compileProvider, $locationProvider) {
    $compileProvider.debugInfoEnabled(false); //Performance
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|whatsapp):/);

}]);


eventify.config(['$routeProvider',
    function($routeProvider) {
        var routeResolver = {
            city: function() {
                return "montreal";
            }
        }

        $routeProvider.
        when('/:city/categories/:categories*\/events/', {
            templateUrl: 'views/events.html',
            controller: 'EventsController'
        }).
        when('/:city/events/:eventId', {
            templateUrl: 'views/events-details.html',
            controller: 'EventDetailsController'
        }).
        when('/:city/locations', {
            templateUrl: 'views/locations.html',
            controller: 'LocationsController'
        }).
        when('/:city/locations/:locationId', {
            templateUrl: 'views/locations-details.html',
            controller: 'LocationDetailsController'
        }).
        when('/:city', {
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            resolve: routeResolver
        }).otherwise({
            redirectTo: '/montreal/locations'
        });
    }
]);
;'use strict';

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
;'use strict';

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
;'use strict';

/* App Module */

angular.module('eventify').directive('rating', function() {
  return {
    restrict: 'E',
    scope: {
      ratings: '='
    },
    controller: ['$scope', function($scope) {
      $scope.rate = function(ratings) {
        console.log('do the raiting' + ratings)
      }
    }],
    templateUrl: 'views/components/rating.html'
  };
});
;'use strict';

/* App Module */

angular.module('eventify').directive('sharesocial', ["$window", "AnalyticsService", function($window, analyticsService) {
  return {
    restrict: 'E',
    scope: {
      message: '=',
      url: '='
    },
    controller: ['$scope', function($scope) {
      $scope.facebookUrl = "https://www.facebook.com/sharer/sharer.php?&u=" + encodeURIComponent($scope.url);
      $scope.twitterUrl = "https://twitter.com/intent/tweet?text=" + $scope.message + "&url=" + encodeURIComponent($scope.url);
      $scope.whatsappUrl = "whatsapp://send?text=" + $scope.message + " " + $scope.url;

      $scope.share = function(shareUrl) {
        $window.open(shareUrl, 'sharesocial', 'height=450, width=550, top=' +
          ($window.innerHeight / 2 - 275) + ', left=' + ($window.innerWidth / 2 - 225) +
          ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

        analyticsService.track({
          category: 'social',
          action: 'share',
          url: $scope.url
        });
      }
    }],
    templateUrl: 'views/components/share-social.html'
  };
}]);
;'use strict';

var config_module = angular.module('eventifyConfig', [])
    .constant('CONFIG', {
        CATEGORIES_REVIEWS_ORDER: ['class', 'party'],
        EVENTS_ENDPOINT: '/api/events',
        CATEGORIES_ENDPOINT: '/api/categories',
        LOCATIONS_ENDPOINT: '/api/locations',
        TODAY: new Date(),
        ONE_DAY_MILIS: 86400000,
        WEEKEND_DAYS: [5, 6, 0],
        WEEK_DAYS: [1, 2, 3, 4, 5, 6, 0],
        DEFAULT_CATEGORIES: {
            "musictype": "salsa"
        }
    });
;'use strict';

/* Controllers */

angular.module('eventifyControllers')
    .controller('CategoriesController', ['$scope', '$http', '$routeParams', 'CONFIG', 'diffusionService',
        function($scope, $http, $routeParams, CONFIG, diffusionService) {


            $scope.isCollapsed = false;
            $scope.selectedCategories = {};
            $scope.root = {
                categories: []
            };
            $scope.reloadCategories = false;
            $scope.selectedEventtype = {};

            if (!$scope.categories) {
                $http.get(CONFIG.CATEGORIES_ENDPOINT).success(function(data) {
                    $scope.categories = data;
                    $scope.root = data['root'];
                    setDefaultValues();
                });
            }

            var setDefaultValues = function() {
                $scope.selectedCategories = {};
                for (var key in CONFIG.DEFAULT_CATEGORIES) {
                    toogleCategory(key, CONFIG.DEFAULT_CATEGORIES[key]);
                }

                //the event type selected by the user
                if ($routeParams.categories) {
                    //I don't know why this star is being passed, so I remove it.
                    var codes = $routeParams.categories.replace('*', '').split('/');
                    codes.forEach(function(childId) {
                        toogleCategory(getParentCategoryCode(childId), childId)
                    });
                }

                diffusionService.changeCategories($scope.selectedCategories);
            };

            var getParentCategoryCode = function(childId) {
                if ($scope.categories) {
                    var child = $scope.categories[childId];
                    if (child) {
                        return child.parent;
                    }
                }
                return null;
            }


            $scope.changeSelectCategory = function(parentId, childId) {
                toogleCategory(parentId, childId)
                diffusionService.changeCategories($scope.selectedCategories);
            };

            var toogleCategory = function(parentId, childId) {
                $scope.selectedCategories[parentId] = ($scope.selectedCategories[parentId] !== childId ? childId : null);
                toogleRootCategory(parentId, childId);
                if (parentId == 'eventtype') {
                    $scope.selectedEventtype = $scope.categories[$scope.selectedCategories[parentId]];
                }
            }

            var toogleRootCategory = function(parentId, childId) {
                if (!childId) return;

                var child = $scope.categories[childId];
                var index = $scope.root.categories.indexOf(child);
                var isSelected = $scope.selectedCategories[parentId] === childId;
                var isRoot = index >= 0;

                if (isSelected && !isRoot) {
                    $scope.root.categories.push(child);
                } else {
                    $scope.root.categories.splice(index, 1);
                    // Since it's not root anymore it can't have a selected child
                    toogleCategory(childId, null);
                }
            }

            diffusionService.onChangeEvents($scope, function(message) {
                $scope.eventsCategories = (message.eventsCategories ? message.eventsCategories : []);
                changeCategoriesStatus();
            });

            var changeCategoriesStatus = function() {

                $scope.root.categories.forEach(function(parent) {

                    var visibleCount = 0;
                    $scope.categories[parent.id].categories.forEach(function(category) {
                        updateCategoryStatus(category);

                        if (category.visible) {
                            visibleCount++;
                        }
                    });

                    parent.visible = updateRootCategoryStatus(parent, visibleCount);

                });
            }


            var updateRootCategoryStatus = function(category, count) {
                var isEventType = category.id === "eventtype";
                var isChildToggled = angular.isString($scope.selectedCategories[category.id]);
                var isVisibleChildren = count >= 1;

                return (isChildToggled || isVisibleChildren) && !isEventType;
            }


            var updateCategoryStatus = function(category) {

                category.selected = $scope.selectedCategories[category.parent] === category.id;

                var isHappensOn = category.parent === "happenson";
                var isContainedInEvents = $scope.eventsCategories.indexOf(category.id) != -1;
                var isNoSiblingToggled = !angular.isString($scope.selectedCategories[category.parent]);

                category.visible = (isHappensOn || isContainedInEvents) && (isNoSiblingToggled || category.selected);
                category.disabled = !(isHappensOn || isContainedInEvents);


            }

        }


    ]);
;'use strict';

/* Controllers */

angular.module('eventifyControllers')
    .controller('EventDetailsController', ['$scope', '$http', '$routeParams', 'CONFIG', 'MapsService',
        function($scope, $http, $routeParams, CONFIG, MapsService) {


            $scope.event = {};

            $http.get(CONFIG.EVENTS_ENDPOINT + '/' + $routeParams.eventId).
            success(function(data, status, headers, config) {
                $scope.event = data;

                if ($scope.event) {
                    MapsService.init($scope.event.location, 14);
                    MapsService.addLocation($scope.event.location);
                }
                
            }).
            error(function(data, status, headers, config) {
                console.log("Something went wrong");
            });

            window.scrollTo(0, 0);
        }
    ]);
;'use strict';

/* Controllers */

angular.module('eventifyControllers')
    .controller('EventsController', ['$scope', '$http', '$filter', '$routeParams', 'CONFIG', 'diffusionService', 'MapsService',
        function($scope, $http, $filter, $routeParams, CONFIG, diffusionService, MapsService) {

            $scope.localTime = CONFIG.TODAY;
            $scope.selectedCategories = {};
            $scope.events = [];
            $scope.loading = true;

            //TODO: replace this with a proper configuration depending on the environment.
            if ($routeParams.testDate) {
                $scope.localTime = new Date($routeParams.testDate);
            }


            diffusionService.onChangeCategories($scope, function(message) {
                $scope.selectedCategories = message.selected;
                $scope.loading = true;
                filterEvents();
            });

            var filterEvents = function() {
                searchEvents(getSelecteCategoryValues(), null, function(results) {
                    $scope.events = results.events;
                    showEventsInMap($scope.events);
                    diffusionService.changeEvents(results.eventsCategories);
                })
            };

            var searchEvents = function(categories, location, callback) {
                var config = {
                    params: {
                        "categories": categories.join(",")
                    }
                }

                $http.get(CONFIG.EVENTS_ENDPOINT, config).success(function(data) {
                    callback(data);
                    $scope.loading = false;
                });

            }

            var getSelecteCategoryValues = function() {
                var categories = [];
                for (var key in $scope.selectedCategories) {
                    if ($scope.selectedCategories[key]) {
                        categories.push($scope.selectedCategories[key]);
                    }
                }
                return categories;
            }


            var showEventsInMap = function(events) {
                MapsService.reset();
                if (angular.isArray(events)) {
                    events.forEach(function(lEvent) {
                        MapsService.addLocation(lEvent.location);
                    });
                }
            }

            $scope.highlightLocation = function(location) {
                MapsService.highlightLocation(location);
            }


            MapsService.init();
        }


    ]);
;'use strict';

/* Controllers */

angular.module('eventifyControllers')
    .controller('HomeController', ['$scope', '$rootScope', '$http', 'AnalyticsService', 'CONFIG', HomeController]);

function HomeController($scope, $rootScope, $http, analyticsService, CONFIG) {
    $rootScope.CONFIG = CONFIG;

    if (!$rootScope.categories) {
      $http.get(CONFIG.CATEGORIES_ENDPOINT).success(function(data) {
        $rootScope.categories = data;
      });
    }

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

        $scope.city = toTitleCase(current.params.city);
        $rootScope.seo = {
            title: "Up Salsa in " + $scope.city + " : Best places to dance Salsa, Bachata, Kizomba, etc.",
            metaDescription: "Find the best places and events to learn or dance in " + $scope.city + "any latin music like salsa, bachata, chacha, kizomba, etc."
        }

    });

    analyticsService.init();

    var toTitleCase = function(str) {
        if (str) {
            return str.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    }


    $('#navbarCollapse').click(function() {
        if ($('#navbarCollapse').hasClass('in')) {
            $(".navbar-toggle").click();
        }
    });

};
;'use strict';

/* Controllers */

angular.module('eventifyControllers')
  .controller('LocationDetailsController', ['$rootScope', '$scope', '$http', '$routeParams', 'CONFIG', 'MapsService',
    function($rootScope, $scope, $http, $routeParams, CONFIG, MapsService) {

      // would get the next category the user would rate
      $scope.getUnratedCategory = function(location) {
        return $rootScope.categories['class'];
      }

      $scope.location = {};

      $http.get(CONFIG.LOCATIONS_ENDPOINT + '/' + $routeParams.locationId).
      success(function(data, status, headers, config) {
        $scope.location = data;

        if ($scope.location) {
          MapsService.init($scope.location, 14);
          MapsService.addLocation($scope.location);

          var rating = {
            category: $scope.getUnratedCategory($scope.location)
          }

          if (! $scope.location.ratings)
            $scope.location.ratings = [];

          $scope.location.ratings.push(rating);
        }

      })



      window.scrollTo(0, 0);
    }
  ]);
;'use strict';

/* Controllers */

angular.module('eventifyControllers')
    .controller('LocationsController', ['$scope', '$http', '$routeParams', 'CONFIG', 'MapsService',
        function($scope, $http, $routeParams, CONFIG, MapsService) {


            $scope.locations = [];

            $http.get(CONFIG.LOCATIONS_ENDPOINT).
            success(function(data, status, headers, config) {
                $scope.locations = data;


                if ($scope.locations) {
                    MapsService.init();
                    $scope.locations.forEach(function(location) {
                        MapsService.addLocation(location);
                    });
                }
            }).
            error(function(data, status, headers, config) {
                console.log("Something went wrong with the locations");
            });

            $scope.highlightLocation = function(location) {
                MapsService.highlightLocation(location);
            }

            window.scrollTo(0, 0);
        }
    ]);
;'use strict';

/* Filters */

angular.module('eventifyFilters')
    .filter('fullUrl', ['$location', function($location) {
        return function(partialPath) {
            return $location.absUrl().replace($location.path(), partialPath);
        };
    }]);
;;'use strict';

/* Service */

angular.module('eventifyServices')
    .factory('AnalyticsService', ['$rootScope', '$window', '$location', AnalyticsService]);

function AnalyticsService($rootScope, $window, $location) {

    var service = {
        init: function() {
            $rootScope.$on('$viewContentLoaded', function(event) {
                $window.ga('send', 'pageview', {
                    page: $location.url()
                });
            });
        },
        track: function(trackInfo) {
            ga('send', 'event', trackInfo.category, trackInfo.action, {'page': trackInfo.url});
        }
    };

    return service;
};
;'use strict';

/* Service */

angular.module('eventifyServices')
    .factory('MapsService', MapsService);

function MapsService() {
    var map;
    var markers = [];
    var markerByLocation;
    var currentMarker;
    var defaultIcon = "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png";
    var highlightIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";


    var service = {
        reset: function() {
            if (markers) {
                markers.forEach(function(marker) {
                    marker.setMap(null);
                });
                markers = [];
                markerByLocation = [];
            }
        },
        init: function(location, lZoom) {
            map = {};
            markerByLocation = {};



            var mapOptions = {
                center: {
                    lat: (location ? location.coordinates.latitude : 45.560),
                    lng: (location ? location.coordinates.longitude : -73.712)
                },
                zoom: (lZoom ? lZoom : 10)
            };
            if (document.getElementById('map-canvas')) {
                map = new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);
            }

        },
        addLocation: function(location) {
            if (location && !markerByLocation[location.id]) {

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(location.coordinates.latitude, location.coordinates.longitude),
                    map: map,
                    title: location.name
                });
                markerByLocation[location.id] = marker;
                markers.push(marker);
            }
        },
        highlightLocation: function(location) {
            if (location) {
                var marker = markerByLocation[location.id];
                if (marker) {
                    if (currentMarker) {
                        currentMarker.setIcon(defaultIcon);
                        currentMarker.setZIndex(-1);
                    }
                    marker.setIcon(highlightIcon);
                    marker.setZIndex(100);
                    currentMarker = marker;
                }
            }
        }
    };

    return service;
};
;window.Set = function() {
    this.content = {};
}
Set.prototype.content = function() {
    return this.content;
}
Set.prototype.add = function(val) {
    this.content[val] = true;
}
Set.prototype.remove = function(val) {
    delete this.content[val];
}
Set.prototype.contains = function(val) {
    return (val in this.content);
}
Set.prototype.asArray = function() {
    var res = [];
    for (var val in this.content) res.push(val);
    return res;
}
;'use strict';

/* Service */

angular.module('eventifyServices')
    .factory('diffusionService', ['$rootScope',
        function($rootScope) {

            var CHANGE_CATEGORIES = "changeCategories";
            var CHANGE_EVENTS = "changeEvents";


            var changeCategories = function(selectedCategories) {
                $rootScope.$broadcast(CHANGE_CATEGORIES, {
                    selected: selectedCategories
                });
            };

            var onChangeCategories = function($scope, handler) {
                $scope.$on(CHANGE_CATEGORIES, function(event, message) {
                    handler(message);
                });
            };
            
            var changeEvents = function(eventsCategories) {
                $rootScope.$broadcast(CHANGE_EVENTS, {
                    eventsCategories: eventsCategories
                });
            };

            var onChangeEvents = function($scope, handler) {
                $scope.$on(CHANGE_EVENTS, function(event, message) {
                    handler(message);
                });
            };

            return {
                changeCategories: changeCategories,
                onChangeCategories: onChangeCategories,
                changeEvents: changeEvents,
                onChangeEvents: onChangeEvents
            }

        }
    ]);