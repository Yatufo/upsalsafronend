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
            respond(categoriesListMock);
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

        it('Categories must have the first child as default', function() {
            expect(scope.categories).toBeUndefined();
            mockHttp.flush();
            expect(scope.categories).toBeDefined();

            expect(scope.categories[0].id).toEqual("1-parent");
            expect(scope.selectedCategories["1-parent"]).toEqual("11-child");
            expect(scope.selectedCategories["2-parent"]).toEqual("21-child");
            expect(scope.selectedCategories["12-child"]).toEqual("121-grandchild");

        });

    });


    var categoriesListMock = [{
        id: '1-parent',
        categories: [{
            "id": '11-child'
        }, {
            "id": '12-child',
            categories: [{
                "id": '121-grandchild'
            }, {
                "id": '122-grandchild'
            }]
        }]
    }, {
        id: '2-parent',
        categories: [{
            "id": '21-child'
        }]
    }];


});