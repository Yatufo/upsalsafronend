

//TODO: use module.config
var config_module = angular.module('eventifyConfig', [])
    .constant('CONFIG', {
        CATEGORIES_REVIEWS_ORDER: ['class', 'party'],
        EVENTS_ENDPOINT: '/api/events',
        TODAY: new Date(),
        ONE_DAY_MILIS: 86400000,
        WEEKEND_DAYS: [5, 6, 0],
        WEEK_DAYS: [1, 2, 3, 4, 5, 6, 0],
        DEFAULT_CATEGORIES: {
            "musictype": "salsa"
        }
    });
