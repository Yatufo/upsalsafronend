'use strict';

/* jasmine specs for filters go here */
describe('MyApp Filters', function() {

    describe('HappensOnFilt', function() {
        beforeEach(module('myApp'));
        var config = {};
        config.ONE_DAY_MILIS = 86400000;

        beforeEach(inject(function($filter, CONFIG) {
            console.log(CONFIG.ONE_DAY_MILIS);
            config = CONFIG;
        }));

        //For the test a TUESDAY will be the sample date
        var localTime = new Date('2014-10-21T00:00:01-04:00');

        var todayEvent = {
            start: {
                dateTime: localTime
            }
        };

        var tomorrowEvent = {
            start: {
                dateTime: localTime + config.ONE_DAY_MILIS
            }
        };

        var tomorrowEvent = {
            start: {
                dateTime: localTime + (2 * config.ONE_DAY_MILIS)
            }
        };






        var todaysEvents = [todayEvent, {}, {}, {}];


        it('should filter the events by the date interval',
            inject(function(happensOnFilter) {
                expect(happensOnFilter(todaysEvents, 'today', localTime).length).toBe(1);
            }));
    });
});