'use strict';

/* jasmine specs for controllers go here */
describe('eventify controllers', function() {

    describe('EventsController', function() {
        var scope, mockHttp, config;

        beforeEach(module('eventify'));

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, CONFIG) {
            mockHttp = _$httpBackend_;
            mockHttp.expectGET(CONFIG.EVENTS_ENDPOINT).
            respond([{
                summary: 'Salsa'
            }]);
            config = CONFIG;
            scope = $rootScope.$new();
            $controller('EventsController', {
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

        });


    });

});