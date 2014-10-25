'use strict';

/* jasmine specs for controllers go here */
describe('My App controllers', function() {

    describe('EventsCtrl', function() {
        var scope, ctrl, $httpBackend;

        beforeEach(module('myApp'));

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, CONFIG) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET(CONFIG.EVENTS_ENDPOINT).
            respond([{
                summary: 'Salsa'
            }, {
                summary: 'Bachata'
            }]);

            scope = $rootScope.$new();
            ctrl = $controller('EventsCtrl', {
                $scope: scope
            });
        }));


        it('should add to scope "events" model with 2 events fetched from xhr', function() {
            expect(scope.events).toBeUndefined();
            $httpBackend.flush();

            expect(scope.events).toEqual([{
                summary: 'Salsa'
            }, {
                summary: 'Bachata'
            }]);
        });


    });


});