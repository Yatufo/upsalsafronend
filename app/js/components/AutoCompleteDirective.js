'use strict';

var AutocompleteDirectiveController = function($scope) {

  function init() {
    $scope.inputid = $scope.inputid ? $scope.inputid : 'autocomplete';

    // Create the autocomplete object, restricting the search to geographical
    // location types.
    var input = document.getElementById($scope.inputid);
    $scope.autocomplete = new google.maps.places.Autocomplete(input);

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    $scope.autocomplete.addListener('place_changed', onPlaceChanged);
  }

  function onPlaceChanged() {
    var place = $scope.autocomplete.getPlace();

    $scope.$apply(function () {

      $scope.location.address = place.formatted_address;
      $scope.location.coordinates = {
        longitude: place.geometry.location.lng(),
        latitude: place.geometry.location.lat()
      };

    });
  }

  init();
};

eventify.directive('autocomplete', function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    scope: {
      inputid: '@id',
      completed: '&',
      location: '='
    },
    controller: ['$scope', AutocompleteDirectiveController]
  };
});
