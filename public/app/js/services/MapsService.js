'use strict';

/* Service */

angular.module('myAppServices')
    .factory('MapsService', MapsService);

function MapsService() {
    var map;
    var addedLocations;
    
    var service = {
        init: function() {
            map ={};
            addedLocations = {};

            var mapOptions = {
                center: {
                    lat: 45.560,
                    lng: -73.712
                },
                zoom: 10
            };
            if (document.getElementById('map-canvas')) {
                map = new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);
            }

        },
        addLocation: function(location) {
            if (location && !addedLocations[location.id]) {

                addedLocations[location.id] = true;
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(location.coordinates.latitude, location.coordinates.longitude),
                    map: map,
                    title: location.name
                });
            }
        }
    };

    return service;
};
