'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /events when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/events");
  });


  describe('events', function() {

    beforeEach(function() {
      browser.get('index.html#/events');
    });


    it('should render events when user navigates to /events', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch('Local Time "2014-10-26T04:00:01.000Z"');
    });

  });

});
