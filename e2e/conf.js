// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://salsa.local:5000/Montreal/locations',
  specs: ['*-spec.js'],
  capabilities: {
    browserName: 'firefox'
  }
}
