'use strict';

angular.module('eventify').directive('autocomplete', ['$log', '$window', '$q', function($log, $window, $q) {
  var GEOCODE = 'geocode';
  var _HEAD = "head";
  var _SCRIPT = "script";
  var _TEXT_JAVASCRIPT = "text/javascript";
  var MAPS_URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCP0UzLXfGQFdirwTB9fhWr48CI2VLOhOc&signed_in=true&libraries=places&callback=initAutocomplete';
  var CHANGED = "addressChanged";

   var loadScript = function(src, callback, fxe) {
     var script = document.createElement(_SCRIPT);
     script.type = _TEXT_JAVASCRIPT;
     script.async = true;
     script.src = src;
     if(callback) 
       script.onload = callback;
     if(fxe) 
       script.onerror = fxe;
     document.body.appendChild(script); 
    }      
    
    function loadMapsApi() {
      loadScript(MAPS_URL, function() {
        $log.info('google-loader has been loaded, but not the maps-API');
      }, function() {
        $log.info('google-loader NO has been loaded, but not the maps-API. Problems with Maps Api ');
      });
    }

    var getAddressMapper = function (place) {
      var dto = {};
      var attributes = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };
      dto.formattedAddress = place.formatted_address; 
      dto.location = place.geometry.location;
      //dto.latitude = place.geometry.location.lat();
      //dto.longitude = place.geometry.location.lng();
      
      angular.forEach(place.address_components, function(d) {
        var type = d.types[0];
        if (attributes[type]) {
          var value = d[attributes[type]];
          dto[type] = value;
        }
      });
      return dto;
    };

  return {
    restrict: 'A',
    require: '?ngModel',
    scope : {
      inputid:'@id',
      completed:'&'
    },

    link : function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) { return; } // no hace nada si no tiene ng-model
       var navigator = $window.navigator;
       var placeSearch, autocomplete;
       scope.inputid = attrs.inputid ? attrs.inputid : 'autocomplete';

       // [START region_geolocation]
       // Bias the autocomplete object to the user's geographical location,
       // as supplied by the browser's 'navigator.geolocation' object.
       var geolocate = function () {
         if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(function(position) {
             var geolocation = {
               lat: position.coords.latitude,
               lng: position.coords.longitude
             };
             var circle = new google.maps.Circle({
               center: geolocation,
               radius: position.coords.accuracy
             });
             autocomplete.setBounds(circle.getBounds());
           });
         }
       }
       // [END region_geolocation]

       loadMapsApi();
       /*if ($window.google && $window.google.maps) {
         $log.info('gmaps already loaded');
       } else {
         loadMapsApi();
       } */  
           
      
      element.on('onfocus', function(evento) {
       scope.$apply(geolocate);
      });
      
      if(scope.completed) {  
        scope.$on(CHANGED, function(event, dto) {
          scope.completed({data:dto});
          scope.$apply();
          event.stopPropagation();
        });
      }

      $window.initAutocomplete = function() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(/** @type {!HTMLInputElement} */(document.getElementById(scope.inputid)),
            {types: [GEOCODE]});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);
      }

      // [START region_fillform]
      var fillInAddress = function() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();
        var dto = getAddressMapper(place);
        scope.$emit(CHANGED, dto);
      }

    }




  };
}]);
