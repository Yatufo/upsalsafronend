var EditableEventCardController = function($scope, service, CONFIG) {

    $scope.pickerOptions = {
      minView: 'minutes',
      dropdownSelector: '#startDateSelector'
    }

    function toLocation(location) {
      return _.pick(location, 'id', 'name', 'address', 'url', 'phone', 'coordinates')
    }

    function init(argument) {
      var start = moment().startOf('hour').add(1, 'hours');


      $scope.event = {
        location : toLocation($scope.location),
        categories: ['party'], //TODO Get the categories as hashtags from the desciption
        images : [],
        imageUrl: CONFIG.EVENT_DEFAULT_IMAGE,
        start: {
          dateTime: start.toDate()
        }
      };
    };

    $scope.$watch("event.start.dateTime", function (newVal) {
      if (newVal){
        $scope.event.end = { dateTime : new moment(newVal).add(1, 'hours').toDate()};
      }
    })

    $scope.save =  function() {
      service.saveOrUpdate($scope.event)
        .then(function(saved) {
          $scope.$emit('event', saved);
        });
    }

    $scope.cancel = function () {
      $scope.$emit('event');
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
    scope: {
      location: '=',
      onCancel: '&',
      onSave: '&',
    },
    controller: ['$scope', 'EventService', 'CONFIG', EditableEventCardController],
    templateUrl: 'views/components/editable-event-card.html'
  };
});
