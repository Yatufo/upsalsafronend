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
  // TODO: use a path in the same domain.
  LO_RES_IMAGES: 'images/w320-h200-cscale/images/',
  HI_RES_IMAGES: 'images/w640-h400-cscale/images/',
  LOCATIONS_DEFAULT_IMAGE: 'locations/montreal.jpg',
  EVENT_DEFAULT_IMAGE: 'events/default.jpg',
  DEFAULT_IMAGE_ENDPOINT: "api/images",
  ARRAY_PARAM_SEPARATOR: ",",
  HASHTAG: '#',
  EXTRACT_HASHTAG_REGEX: /#\w+/g,
  HIDDEN_CATEGORIES: ["root", "happenson"],
  DEFAULT_LOCATION: {
    coordinates: {
      latitude: 45.560,
      longitude: -73.712
    },
    timeZone : "America/New_York"
  },
  DEFAULT_LOCATION_ZOOM : 10
});
