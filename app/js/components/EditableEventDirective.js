var EditableEventCardController = function($scope, $rootScope, service, categoryService, CONFIG, util) {

  var TIMEZONE = CONFIG.DEFAULT_LOCATION.timeZone;
  $scope.submitted = false;
  $scope.smartarea = {
    description: {
      autocomplete: []
    }
  };

  categoryService.getCategories().then(function(categories) {
    $scope.smartarea.description.autocomplete = [{
      words: categoryService.getHashTags(categories),
      cssClass: 'hashtags'
    }]
  });


  var start = moment().startOf('hour').add(1, 'hours');

  $scope.selections = {
    repeat: false,
    count: 6,
    dows: {},
    localTime: {
      start: start.toDate()
    }
  }

  var dowIds = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA];
  var i = 0;
  $scope.allDows = dowIds.map(function(id) {
    return {
      id: id,
      name: moment.weekdays(i++)
    };
  });

  $scope.$watch("[selections.repeat, selections.count]", function() {
    resetRecurrenceRule();
  });
  $scope.$watchCollection("selections.dows", function() {
    resetRecurrenceRule();
  });

  function resetRecurrenceRule() {
    if (!$scope.event) return false;

    if ($scope.selections.repeat) {
      var selectedDows = _.compact(dowIds.map(function(id) {
        if ($scope.selections.dows[id]) {
          return id;
        }
      }));
      var rule = new RRule({
        freq: RRule.WEEKLY,
        wkst: RRule.SU,
        count: $scope.selections.count,
        byweekday: selectedDows
      })

      $scope.selections.ruleText = rule.toText();
      $scope.event.recurrence = {
        rule: rule.toString()
      }

    } else {
      $scope.selections.ruleText = "";
      $scope.event.recurrence = {};
    }
  }

  function toLocation(location) {
    return _.pick(location, 'id', 'name', 'address', 'url', 'phone', 'coordinates');
  }

  function init() {
    $scope.event = {
      location: toLocation($scope.location),
      description: "Should contain at least #party or #class",
      categories: [],
      images: $scope.location.images || []
    };
    _.extend($scope.event, util.getUrls($scope.event, "event"));
  };

  $scope.$watch("location", function(newVal) {
    if (!$scope.event && ! _.isEmpty(newVal)){
      init();
    }
  })

  $scope.$watch("selections.localTime.start", function(newVal) {
    if (newVal) {
      resetRecurrenceRule();
      var localTime = $scope.selections.localTime
      if (!localTime.end || localTime.end < localTime.start) {
        localTime.end = new moment(newVal).add(4, 'hours').toDate();
      }
    }
  });

  function convertTimeZome(localDate, timeZone) {
    var localHour = moment(localDate).format(CONFIG.ISO_TIME_UNTIL_HOUR);
    return moment.tz(localHour, timeZone).toDate();
  }


  $scope.canSave = function() {

    $scope.event.categories = categoryService.extractCategories($scope.event.description);

    $scope.event.start = {
      dateTime: convertTimeZome($scope.selections.localTime.start, TIMEZONE),
      timeZone: TIMEZONE
    };

    $scope.event.end = {
      dateTime: convertTimeZome($scope.selections.localTime.end, TIMEZONE),
      timeZone: TIMEZONE
    };

    var c = $scope.event.location.coordinates;
    var hasCoordinates = _.isNumber(c.latitude) && _.isNumber(c.longitude);

    var validDates = $scope.event.end.dateTime > $scope.event.start.dateTime;

    return $scope.eventForm.$valid && !_.isEmpty($scope.event.categories) && validDates && hasCoordinates;
  };


  $scope.hasCoordinates = function() {
    if (!$scope.event) return false;

    var c = $scope.event.location.coordinates;
    return !_.isEmpty(c) && _.isNumber(c.latitude) && _.isNumber(c.longitude);
  }

  $scope.isInvalid = function (field) {
      if (!$scope.event) return true;

      var isInvalid = false;

      if (field === 'address'){
        isInvalid = !$scope.hasCoordinates()
      }

      if (field === 'description'){
        var REQUIRED_CATEGORIES = ['class', 'party']
        isInvalid = _.isEmpty(_.intersection(categoryService.extractCategories($scope.event.description), REQUIRED_CATEGORIES))
      }

      return $scope.submitted && (!$scope.eventForm[field].$valid || isInvalid);
  }


  $scope.save = function() {
    $scope.submitted = true;
    if ($scope.canSave()) {
      service.saveOrUpdate($scope.event)
        .then(function(saved) {
          _.extend(saved, util.getUrls(saved, "event"))
          $scope.$emit('eventSaved', saved);
        });
    } else {
      console.debug($scope.eventForm);
    }
  }

  $scope.cancel = function() {
    $scope.$emit('eventCancelled');
  }

  $scope.getDuration = function() {
    var localTime = $scope.selections.localTime
    return localTime.end ? moment(localTime.end).diff(localTime.start, 'hours') : 0;
  }

}

/* App Module */
eventify.directive('editableeventcard', function() {
  return {
    restrict: 'E',
    scope: {
      location: '=',
      event: '=?',
      options: '=?',
      onCancel: '&',
      onSave: '&'
    },
    controller: ['$scope', '$rootScope', 'EventService', 'CategoryService', 'CONFIG', 'UtilService', EditableEventCardController],
    templateUrl: 'views/components/editable-event-card.html'
  };
});
