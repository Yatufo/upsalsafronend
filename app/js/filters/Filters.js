/* Filters */

eventify
  .filter('fullUrl', ['$location', function($location) {
    return function(partialPath) {
      return $location.absUrl().replace($location.path(), partialPath);
    };
  }]);


eventify
  .filter('calendar', [function() {
    return function(dateTime) {
      var CALENDAR_FORMAT = "dddd, MMM Do, h:mm a"
      return moment(dateTime).calendar(null, {sameElse : CALENDAR_FORMAT});
    };
  }]);
