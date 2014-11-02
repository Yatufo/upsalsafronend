'use strict';

/* jasmine specs for controllers go here */
describe('MyApp controllers', function() {

    describe('CategoriesCtrl', function() {
        var scope, mockHttp, config;

        beforeEach(module('myApp'));

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, CONFIG) {
            mockHttp = _$httpBackend_;
            mockHttp.expectGET(CONFIG.CATEGORIES_ENDPOINT).
            respond(categoriesListMock);
            config = CONFIG;
            scope = $rootScope.$new();
            $controller('CategoriesCtrl', {
                $scope: scope
            });
        }));

        it('Categories must have the first child as default', function() {
            expect(scope.categoryTree).toBeUndefined();
            mockHttp.flush();
            expect(scope.categoryTree).toBeDefined();

            expect(scope.categoryTree.categories[0].id).toEqual("1-parent");
            expect(scope.selectedCategories["1-parent"]).toEqual("11-child");
            expect(scope.selectedCategories["2-parent"]).toEqual("21-child");
            expect(scope.selectedCategories["12-child"]).toEqual("121-grandchild");

        });

    });

    var categoriesListMock = {
        id: "root",
        categories: [{
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
        }]
    };


});