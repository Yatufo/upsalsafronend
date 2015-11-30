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
      return moment(dateTime).calendar();
    };
  }]);
