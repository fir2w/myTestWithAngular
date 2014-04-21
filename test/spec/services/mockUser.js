'use strict';

describe('Service: mockUser', function () {

  // load the service's module
  beforeEach(module('firstApp'));

  // instantiate service
  var mockUser;

  beforeEach(inject(function (_Users_) {
    mockUser = _Users_;
  }));

  it('should do something', function () {
    expect(!!mockUser).toBe(true);
  });

});
