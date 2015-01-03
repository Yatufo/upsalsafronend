'use strict';

/* Service */

angular.module('myAppServices')
    .factory('MapsService', MapsService);

function MapsService() {

    var service = {
        init: function() {
            var mapOptions = {
                center: {
                    lat: 45.560,
                    lng: -73.712
                },
                zoom: 10
            };
            if (document.getElementById('map-canvas')) {
                var map = new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);
            }

        }
    };

    return service;
};
