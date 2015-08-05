'use strict';

/* Service */



var MapsService = function() {
  var map;
  var markers = [];
  var markerByLocation;
  var currentMarker;
  var defaultIcon = "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png";
  var highlightIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  var mapElement;

  var infowindowContent = function(location) {
    return "<a target='_parent' href='" + (location.detailsUrl || location.url) + "'> " + location.name+ "</a>";
  };

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
    isMapVisible: function() {
      return $(window).width() > 800; //TODO change for another thing
    },
    getMapCanvas: function() {
      if (!mapElement) {
        var mapsFrame = $("#maps-iframe")[0].contentDocument;
        var mapElement = $('<div/>');
        mapElement[0].setAttribute('style', "width: 100%; height: 100%");
        mapsFrame.body.appendChild(mapElement[0]);
      }
      return mapElement[0];
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

      map = new google.maps.Map(this.getMapCanvas(), mapOptions);
    },
    addLocation: function(location) {
      if (location && !markerByLocation[location.id] && !_.isEmpty(map)) {

        var infowindow = new google.maps.InfoWindow({
          content: infowindowContent(location)
        });


        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(location.coordinates.latitude, location.coordinates.longitude),
          map: map,
          title: location.name
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });

        markerByLocation[location.id] = marker;
        markers.push(marker);

      }
    },
    highlightLocation: function(location) {
      if (!_.isEmpty(map) && location) {
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


angular.module('eventifyServices')
  .factory('MapsService', MapsService);
