'use strict';

describe('Controller: DatepickerDemoCtrl', function () {

  // load the controller's module
  beforeEach(module('firstApp'));

  var DatepickerDemoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DatepickerDemoCtrl = $controller('DatepickerDemoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
