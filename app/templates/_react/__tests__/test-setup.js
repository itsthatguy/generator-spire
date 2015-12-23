jasmine.getEnv().beforeEach(function() {
  this.addMatchers(require('jasmine-object-matchers-jest')['1.3'])
});
jasmine.getEnv().defaultTimeoutInterval = 30000;
