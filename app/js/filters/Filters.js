/* Filters */

eventify
  .filter('fullUrl', ['$location', function($location) {
    return function(partialPath) {
      return $location.absUrl().replace($location.path(), partialPath);
    };
  }]);


eventify
  .filter('calendar', ['CONFIG', function(cfg) {
    return function(timeInfo) {
      var CALENDAR_FORMAT = "dddd, MMM Do, h:mm a"
      var TIMEZONE = timeInfo.timeZone || cfg.DEFAULT_LOCATION.timeZone
      var dateTime = moment(timeInfo.dateTime).tz(TIMEZONE);

      return dateTime.calendar(null, {
        sameElse: CALENDAR_FORMAT
      });
    };
  }]);

eventify
  .filter('hashtags', ['$sce', 'CONFIG', function($sce, CONFIG) {
    return function(text) {
      if (!text) {
        return;
      }

      var result = text;
      text.match(CONFIG.EXTRACT_HASHTAG_REGEX)
        .forEach(function(hashtag) {
          var category = hashtag.replace(CONFIG.HASHTAG, '')
          var link = '<a href="/Montreal/categories/' + category + '/events/">' + hashtag + '</a>'
          result = result.replace(hashtag, link);
        })

      return $sce.trustAsHtml(result.replace(/\n/g, "<br/>"))
    };
  }]);
