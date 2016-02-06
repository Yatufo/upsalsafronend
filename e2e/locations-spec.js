
var ROOT_PATH = '/montreal'
var BASE_URL = 'http://salsa.local:5000' + ROOT_PATH;
var EC = protractor.ExpectedConditions;

describe('create a location', function() {
  it('should be able to cancel', function() {
    browser.get(BASE_URL + '/locations/create');

    element(by.model('location.name')).sendKeys('name of the school');
    element(by.model('location.description')).sendKeys('This is a description #bac');

    var cancelButton = element(by.css('a[ng-click^=cancel]'))
    expect(cancelButton.isPresent()).toBe(true);
    cancelButton.click()

    expect(browser.getLocationAbsUrl()).toBe(ROOT_PATH + '/locations');

  });

  it('should show the description hashtags', function() {
    browser.get(BASE_URL + '/locations/create');
    element(by.model('location.description')).sendKeys('#bac');
    browser.wait(EC.elementToBeClickable(element(by.css('.sa-dropdown'))), 1000);
  });




});
