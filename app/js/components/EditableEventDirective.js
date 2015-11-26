var EditableEventCardController = function($scope, service, CONFIG) {

    $scope.pickerOptions = {
      minView: 'minutes',
      dropdownSelector: '#startDateSelector'
    }


    function init(argument) {
      var start = moment().startOf('hour').add(1, 'hours');
      var end = new moment(start).add(1, 'hours');

      $scope.event = {
        location : $scope.location,
        categories: [],
        detailsUrl: CONFIG.EVENT_DEFAULT_IMAGE,
        start: {
          dateTime: start.toDate()
        },
        end: {
          dateTime: end.toDate()
        }
      };
    };

    $scope.save =  function() {
      service.saveOrUpdate($scope.event).then(console.log("Redirect or do something"));
    }

    $scope.cancel = function () {
      init();
    }
    $scope.getDuration = function() {
      return moment($scope.event.end.dateTime).diff($scope.event.start.dateTime, 'hours');
    }

    init();
  }
  /* App Module */

eventify.directive('editableeventcard', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      location: '=',
      city: '='
    },
    controller: ['$scope', 'EventService', 'CONFIG', EditableEventCardController],
    templateUrl: 'views/components/editable-event-card.html'
  };
});
