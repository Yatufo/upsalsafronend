'use strict';

/* jasmine specs for filters go here */
describe('eventify Filters', function() {

    describe('categories Filter', function() {
        var filter;

        beforeEach(module('eventify'));

        beforeEach(inject(function($filter, CONFIG) {
            filter = $filter('categories');
        }));

        it('should contain all the events containing all the categories selected', function() {
            var filteredEvents = filter(categoryEvents, selectedCategories);
            expect(filteredEvents).toBeArrayOfSize(2);
            expect(filteredEvents).toContain(event1);
            expect(filteredEvents).toContain(event3);
        });
    });

    var event1 = {"id":"1" ,"categories" : ["a","b", "c","d"]};
    var event2 = {"id":"2" ,"categories" : ["d","e","f", "g","h"]};
    var event3 = {"id":"3" ,"categories" : ["a","c","e"]};
    var event4 = {"id":"4" ,"categories" : ["d","a","b"]};
    var event5 = {"id":"5" ,"categories" : ["b","c","f"]};
    
    var categoryEvents = [event1, event2, event3, event4]; 
    var selectedCategories = [];
    selectedCategories["type1"] = "a";
    selectedCategories["type2"] = "c";
    selectedCategories["type3"] = null;
});

