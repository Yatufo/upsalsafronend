'use strict';

/* jasmine specs for controllers go here */
describe('MyApp controllers', function() {

    describe('EventsCtrl', function() {
        var scope, mockHttp, config;

        beforeEach(module('myApp'));

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, CONFIG) {
            mockHttp = _$httpBackend_;
            mockHttp.expectGET(CONFIG.EVENTS_ENDPOINT).
            respond([{
                summary: 'Salsa'
            }]);
            mockHttp.expectGET(CONFIG.CATEGORIES_ENDPOINT).
            respond([{
                id: 'parent',
                categories: [{
                    "id": 'child1'
                }, {
                    "id": 'child2'
                }]
            }]);

            config = CONFIG;
            scope = $rootScope.$new();
            $controller('EventsCtrl', {
                $scope: scope
            });
        }));

        it('All variables must be initialized', function() {
            expect(scope.localTime).toBe(config.TODAY);
            expect(scope.daysRange).toBe(config.DEFAULT_HAPPENSON);
            expect(scope.events).toBeUndefined();

            mockHttp.flush();

            expect(scope.events).toEqual([{
                summary: 'Salsa'
            }]);

            expect(scope.categories[0].id).toEqual("parent");
            expect(scope.selectedCategory["parent"]).toEqual("child1");

        });


    });


});