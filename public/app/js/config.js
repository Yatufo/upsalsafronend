'use strict';

var config_module = angular.module('myAppConfig', [])
    .constant('CONFIG', {
        'EVENTS_ENDPOINT': '/api/events',
        'CATEGORIES_ENDPOINT': '/api/categories',
        'LOCATIONS_ENDPOINT': '/api/locations',
        'TODAY': new Date(),
        'ONE_DAY_MILIS': 86400000,
        'WEEKEND_DAYS': [5, 6, 0],
        'WEEK_DAYS': [1, 2, 3, 4, 5, 6, 0],
        'DEFAULT_CATEGORIES': {
            "musictype": "salsa"
        }
    });
