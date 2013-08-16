'use strict';

describe('Service: UserAuth', function () {

  // load the service's module
  beforeEach(module('spaminatorApp'));

  // instantiate service
  var UserAuth;
  beforeEach(inject(function (_UserAuth_) {
    UserAuth = _UserAuth_;
  }));

  it('should do something', function () {
    expect(!!UserAuth).toBe(true);
  });

});
