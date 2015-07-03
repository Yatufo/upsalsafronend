'use strict';

/* jasmine specs for filters go here */
describe('eventify Filters', function() {

    describe('HappensOn Filter', function() {
        var dayMilis, filter;

        beforeEach(module('eventify'));

        beforeEach(inject(function($filter, CONFIG) {
            filter = $filter('happensOn');
        }));


        //For the test a MONDAY will be the sample date
        var localTime = new Date('2014-10-20T22:00:01-04:00');
        console.log(localTime);

        var eventByDay = [];
        //Generates one event per day of the week
        for (var i = 0; i < 7; i++) {
            eventByDay.push({
                start: {
                    dateTime: localTime.valueOf() + (i * 86400000)
                },
                end: { //Ends 4 hours later
                    dateTime: localTime.valueOf() + (i * 86400000) + 14400000
                }
            });
        }

        var happeningNow = {
            start: {
                dateTime: localTime.valueOf() - (400000)
            },
            end: {
                dateTime: localTime.valueOf() + (400000)
            }
        }

        var todaysEvents = [eventByDay[0], eventByDay[1], eventByDay[0], eventByDay[2], happeningNow];

        it('should filter the events for TODAY interval', function() {
            expect(filter(todaysEvents, 'today', localTime)).toBeArrayOfSize(3);
        });

        var tomorrowsEvents = [eventByDay[0], eventByDay[1], eventByDay[0], eventByDay[2], happeningNow];
        it('should filter the events for TOMORROW interval', function() {
            expect(filter(tomorrowsEvents, 'tomorrow', localTime)).toBeArrayOfSize(1);
        });

        var weekEvents = [eventByDay[0], eventByDay[1], eventByDay[0], eventByDay[2], eventByDay[5], eventByDay[3], eventByDay[6], eventByDay[0], happeningNow];
        it('should filter the events for WEEK interval', function() {
            expect(filter(weekEvents, 'week', localTime)).toBeArrayOfSize(8);
        });

        var weekendEvents = [eventByDay[0], eventByDay[1], eventByDay[4], eventByDay[5], eventByDay[4], eventByDay[6], eventByDay[1], eventByDay[0], happeningNow];
        it('should filter the events for WEEKEND interval', function() {
            expect(filter(weekendEvents, 'weekend', localTime)).toBeArrayOfSize(4);
        });



    });
});