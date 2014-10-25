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
        });


    });


});