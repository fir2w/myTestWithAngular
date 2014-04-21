'use strict';

describe('uniqueEmail directive', function() {
  var $scope, testInput, Users;

  beforeEach(module('firstApp'));

  beforeEach(inject(function($compile, $rootScope, _Users_){
    Users = _Users_;
    spyOn(Users, 'query').andCallThrough();//Spy存储函数的被调用情况和参数,Spy addCallThrough函数监视器，但函数真的执行
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">' +
        '<input name="testInput" ng-model="model.testValue" unique-email>' +
        '</form>'
    );
    $compile(element)($scope);
    $scope.model = {};
    $scope.$digest();
    // Keep a reference to the test input for the tests
    testInput = $scope.form.testInput;
  }));

  it('should be valid initially', function() {
    expect(testInput.$valid).toBe(true);
  });

  it('模型的变化是不会调用Users.query', function() {
    $scope.model.testValue = 'different';
    $scope.$digest();
    expect(Users.query).not.toHaveBeenCalled();
    expect(testInput.$viewValue).toBe('different');
  });

  it('view changes调用Users.query', function() {
    testInput.$setViewValue('different');
    expect(Users.query).toHaveBeenCalled();
  });

  it('view changes 和原始模型的值一样,不会调用Users.query', function() {
    $scope.model.testValue = 'admin@abc.com';
    $scope.$digest();
    testInput.$setViewValue('admin@abc.com');
    expect(Users.query).not.toHaveBeenCalled();//只进行了修改

    testInput.$setViewValue('other@abc.com');
    expect(Users.query).toHaveBeenCalled();
    Users.query.reset();

    testInput.$setViewValue('admin@abc.com');
    expect(Users.query).not.toHaveBeenCalled();
    $scope.model.testValue = 'other@abc.com';
    $scope.$digest();
    testInput.$setViewValue('admin@abc.com');
    expect(Users.query).toHaveBeenCalled();
  });

  it('Users.query响应包含users,设置模型为无效', function() {
    testInput.$setViewValue('different');
    Users.respondWith(['someUser']);
    expect(testInput.$valid).toBe(false);
  });

  it('should set model to valid if the Users.query response contains no users', function() {
    testInput.$setViewValue('different');//传递这个值通过$parsers每个函数
    Users.respondWith([]);//没有查询到用户
    expect(testInput.$valid).toBe(true);//True如果没有错误
  });
});

