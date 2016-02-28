//TODO: use module.config
eventify.constant('CONFIG', {
  CATEGORIES_REVIEWS_ORDER: ['class', 'party'],
  EVENTS_ENDPOINT: '/api/events',
  TODAY: new Date(),
  ONE_DAY_MILIS: 86400000,
  WEEKEND_DAYS: [5, 6, 0],
  WEEK_DAYS: [1, 2, 3, 4, 5, 6, 0],
  DEFAULT_CATEGORIES: {
    "musictype": "salsa"
  },
  HI_RESOLUTION_WIDTH: 640,
  IMAGE_RESOLUTIONS : {
    low : {
      width : 320,
      height : 200
    },
    high : {
      width : 640,
      height : 400
    }
  },
  DEAFULT_IMAGES: {
    site : 'default.jpg',
    location: 'locations/default.jpg',
    event: 'events/default.jpg'
  },
  DEFAULT_IMAGE_ENDPOINT: "api/images",
  ARRAY_PARAM_SEPARATOR: ",",
  HASHTAG: '#',
  EXTRACT_HASHTAG_REGEX: /#\w+/g,
  HIDDEN_CATEGORIES: ["root", "happenson"],
  ISO_TIME_UNTIL_HOUR: "YYYY-MM-DDTHH:mm",
  DEFAULT_LOCATION: {
    coordinates: {
      latitude: 45.560,
      longitude: -73.712
    },
    timeZone: "America/New_York"
  },
  DEFAULT_LOCATION_ZOOM: 10,
  RATEABLE_CATEGORIES: ['favorite']
});
