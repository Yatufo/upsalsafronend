'use strict';

/* jasmine specs for filters go here */
describe('MyApp Filters', function() {
    beforeEach(module('myAppFilters'));



    describe('HappensOnFilt', function() {
    	var events, config, localTime;
    	localTime = new Date('2014-10-26T00:00:01-04:00');
		events = [];


        it('should filter the events by the date interval',
            inject(function(happensOnFilter) {
                expect(happensOnFilter(events, 'today', localTime)).toBe([]);
            }));
    });
});