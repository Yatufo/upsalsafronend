'use strict';

/* App Module */

var eventify = angular.module('eventify', [
    'ngRoute',
    'ngResource',
    'eventifyControllers',
    'eventifyFilters',
    'eventifyConfig',
    'eventifyServices',
    'eventifyResources'
]);

angular.module('eventifyControllers', ['eventifyConfig', 'eventifyServices']);
angular.module('eventifyFilters', ['eventifyConfig']);
angular.module('eventifyServices', ['eventifyConfig']);
angular.module('eventifyResources', ['ngResource']);

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
    controller: ['$scope', 'Rating', function($scope, Rating) {

      var updateVoteSummaryLocally = function(rating, newVote) {
        rating.votes = rating.votes || [];
        var oldVote = rating.vote;
        //Decrease the value of the userVote rating
        if (oldVote && rating.votes[oldVote]) {
          rating.votes[oldVote] = rating.votes[oldVote] - 1 || undefined;
        }
        rating.votes[newVote] = rating.votes[newVote] + 1 || 1;
      }

      var saveOrUpdateRating = function(rating) {
        var resource = new Rating({
          id: rating.id,
          location: rating.location.id,
          category: rating.category.id,
          vote: rating.vote
        });

        if (!resource.id) {
          resource.$save(function(saved, putResponseHeaders) {
            rating.id = saved.id;
          });
        } else {
          Rating.update(resource);
        }
      }

      $scope.resetUnvotedRating = function() {
        $scope.current = undefined;
        if ($scope.ratings) {
          $scope.ratings.slice().reverse().forEach(function(rating) {
            if (!rating.votes) {
              $scope.current = rating;
            }
          });
        }
      };

      $scope.rate = function(rating, userVote) {
        //if there are no changes in the vote
        if (rating.vote && rating.vote === userVote)
          return false;

        updateVoteSummaryLocally(rating, userVote);

        rating.vote = userVote;
        rating.isUp = (rating.vote === 'up');
        rating.isDown = (rating.vote === 'down');

        saveOrUpdateRating(rating);

        $scope.resetUnvotedRating();
      }

      $scope.resetUnvotedRating();

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
    .controller('EventsController', ['$scope', '$http', '$filter', '$routeParams', 'CONFIG', 'DiffusionService', 'MapsService',
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
    .controller('HomeController', ['$scope', '$rootScope', 'AnalyticsService', 'CONFIG', 'CategoriesResource', HomeController]);

function HomeController($scope, $rootScope, analyticsService, CONFIG, CategoriesResource) {
    $rootScope.CONFIG = CONFIG;

    if (!$rootScope.categories) {
      CategoriesResource.query({}, function(categories) {
        var results = {};
        categories.forEach(function(category) {
            results[category.id] = category;
        });

        $rootScope.categories = results;
      });
    };

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
  .controller('LocationDetailsController', ['$rootScope', '$scope', '$routeParams', 'Location', 'MapsService', 'RatingService',
    function($rootScope, $scope, $routeParams, Location, maps, ratingService) {


      $scope.location = {};

      Location.get({
        locationId: $routeParams.locationId
      }, function(location) {

        maps.init(location, 14);
        maps.addLocation(location);

        location.ratings = ratingService.generateRatings(location);
        $scope.location = location;

      });

      window.scrollTo(0, 0);
    }
  ]);
;'use strict';

/* Controllers */

angular.module('eventifyControllers')
    .controller('LocationsController', ['$scope', 'Location', 'MapsService', 'RatingService',
        function($scope, Location, MapsService, ratingService) {


            $scope.locations = [];

            Location.query({}, function(locations) {
                $scope.locations = locations;

                MapsService.init();
                $scope.locations.forEach(function(location) {
                    MapsService.addLocation(location);
                    location.ratings = ratingService.generateRatings(location);
                });
            });

            $scope.highlightLocation = function(location) {
                MapsService.highlightLocation(location);
            }

            window.scrollTo(0, 0);
        }
    ]);
;'use strict';

$(window).scroll(function() {
    if ($(this).scrollTop() > 135) {
        $('#fixedColunm').addClass('fixed');
    } else {
        $('#fixedColunm').removeClass('fixed');
    }
});


var scrolltotop = {
    setting: {
        startline: 100,
        scrollto: 0,
        scrollduration: 1000,
        fadeduration: [500, 100]
    },
    controlHTML: '', //<img src="assets/img/up.png" style="width:51px; height:42px" /> //HTML for control, which is auto wrapped in DIV w/ ID="topcontrol"
    controlattrs: {
        offsetx: 5,
        offsety: 5
    }, //offset of control relative to right/ bottom of window corner
    anchorkeyword: '#top', //Enter href value of HTML anchors on the page that should also act as "Scroll Up" links

    state: {
        isvisible: false,
        shouldvisible: false
    },

    scrollup: function() {
        if (!this.cssfixedsupport) //if control is positioned using JavaScript
            this.$control.css({
                opacity: 0
            }) //hide control immediately after clicking it
        var dest = isNaN(this.setting.scrollto) ? this.setting.scrollto : parseInt(this.setting.scrollto)
        if (typeof dest == "string" && jQuery('#' + dest).length == 1) //check element set by string exists
            dest = jQuery('#' + dest).offset().top
        else
            dest = 0
        this.$body.animate({
            scrollTop: dest
        }, this.setting.scrollduration);
    },

    keepfixed: function() {
        var $window = jQuery(window)
        var controlx = $window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx
        var controly = $window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety
        this.$control.css({
            left: controlx + 'px',
            top: controly + 'px'
        })
    },

    togglecontrol: function() {
        var scrolltop = jQuery(window).scrollTop()
        if (!this.cssfixedsupport)
            this.keepfixed()
        this.state.shouldvisible = (scrolltop >= this.setting.startline) ? true : false
        if (this.state.shouldvisible && !this.state.isvisible) {
            this.$control.stop().animate({
                opacity: 1
            }, this.setting.fadeduration[0])
            this.state.isvisible = true
        } else if (this.state.shouldvisible == false && this.state.isvisible) {
            this.$control.stop().animate({
                opacity: 0
            }, this.setting.fadeduration[1])
            this.state.isvisible = false
        }
    },

    init: function() {
        jQuery(document).ready(function($) {
            var mainobj = scrolltotop
            var iebrws = document.all
            mainobj.cssfixedsupport = !iebrws || iebrws && document.compatMode == "CSS1Compat" && window.XMLHttpRequest //not IE or IE7+ browsers in standards mode
            mainobj.$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body')
            mainobj.$control = $('<div id="topcontrol">' + mainobj.controlHTML + '</div>')
                .css({
                    position: mainobj.cssfixedsupport ? 'fixed' : 'absolute',
                    bottom: mainobj.controlattrs.offsety,
                    right: mainobj.controlattrs.offsetx,
                    opacity: 0,
                    cursor: 'pointer'
                })
                .attr({
                    title: 'Scroll Back to Top'
                })
                .click(function() {
                    mainobj.scrollup();
                    return false
                })
                .appendTo('body')
            if (document.all && !window.XMLHttpRequest && mainobj.$control.text() != '') //loose check for IE6 and below, plus whether control contains any text
                mainobj.$control.css({
                    width: mainobj.$control.width()
                }) //IE6- seems to require an explicit width on a DIV containing text
            mainobj.togglecontrol()
            $('a[href="' + mainobj.anchorkeyword + '"]').click(function() {
                mainobj.scrollup()
                return false
            })
            $(window).bind('scroll resize', function(e) {
                mainobj.togglecontrol()
            })
        })
    }
}

scrolltotop.init()
;'use strict';

/* Filters */

angular.module('eventifyFilters')
    .filter('fullUrl', ['$location', function($location) {
        return function(partialPath) {
            return $location.absUrl().replace($location.path(), partialPath);
        };
    }]);
;'use strict';

/* Service */

angular.module('eventifyResources').factory('CategoriesResource', ['$resource', function($resource) {
  return $resource('/api/categories/:categoryId', {
    'categoryId': '@id'
  }, {
    'update': {
      method: 'PUT'
    }
  });
}]);
;'use strict';

/* Service */

angular.module('eventifyResources').factory('Location', ['$resource', function($resource) {
  return $resource('/api/locations/:locationId', {
    'locationId': '@id'
  }, {
    'update': {
      method: 'PUT'
    }
  });
}]);
;'use strict';

/* Service */

angular.module('eventifyResources').factory('Rating', ['$resource', function($resource) {
  return $resource('/api/ratings/:ratingId', {
    'ratingId': '@id'
  }, {
    'update': {
      method: 'PUT'
    }
  });
}]);
;'use strict';

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
    ]);;'use strict';

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
;'use strict';

/* Service */

angular.module('eventifyServices')
  .factory('RatingService', ['$rootScope', RatingService]);

function RatingService($rootScope) {

  // would get the next category the user would rate
  var getRateableCategories = function(location) {
    return ['class','party','salsa','bachata','kizomba'].map(function(id){
      return $rootScope.categories[id];
    });
  };


  var service = {
    generateRatings: function(location) {
      var generated = [];
      var ratedCategories = [];

      location.ratings.forEach(function(rating) {
        var gRating = {
          category: $rootScope.categories[rating.category],
          votes: rating.votes,
          location: location
        };

        ratedCategories.push(gRating.category);
        generated.push(gRating);
      });

      getRateableCategories().forEach(function(category) {
        if (! _.contains(ratedCategories, category)) {
          generated.push({
            category: category,
            location: location
          });
        }
      });

      return generated;

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
