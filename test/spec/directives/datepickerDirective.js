'use strict';
describe('date-picker directive', function() {
  var $compile, $rootScope;
  var selectDate = function(element, date) {
    element.datepicker('setDate', date);
    //调用jquery的方法
    $.datepicker._selectDate(element);
  };

  beforeEach(module('firstApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  describe('simple use on input element', function() {
    it('should be able to get the date from the model', function() {
      var aDate = new Date(2010, 12, 1);
      var element = $compile("<input date-picker ng-model='x'/>")($rootScope);
      $rootScope.x = aDate;
      $rootScope.$digest();
      expect(element.datepicker('getDate')).toEqual(aDate);
    });
    it('should put the date in the model', function() {
      var aDate = new Date(2010, 12, 1);
      var element = $compile("<input date-picker ng-model='x'/>")($rootScope);
      $rootScope.$digest();
      selectDate(element, aDate);
      expect($rootScope.x).toEqual(aDate);
    });
  });
  describe('when model is not a Date object', function() {
    var element;
    beforeEach(function() {
      element = $compile('<input date-picker ng-model="x"/>')($rootScope);
    });
    it('should not set datepicker to null when model is null or undefined', function() {
      $rootScope.x = null;
      $rootScope.$digest();
      expect(element.datepicker('getDate')).toBe(null);
      $rootScope.x = undefined;
      $rootScope.$digest();
      expect(element.datepicker('getDate')).toBe(null);
    });
    it('should throw an error if the model is not a Date object', function() {
      $rootScope.x = false;
      expect(function() { $rootScope.$digest(); }).toThrow();
      $rootScope.x = 0;
      expect(function() { $rootScope.$digest(); }).toThrow();
      $rootScope.x = '';
      expect(function() { $rootScope.$digest(); }).toThrow();
      $rootScope.x = {};
      expect(function() { $rootScope.$digest(); }).toThrow();
    });
  });

  it('应该更新正确输入字段在手动更新', function() {
    var dateString = '2012-08-17';
    var dateObj = $.datepicker.parseDate('yy-mm-dd', dateString);
    var element = $compile('<input date-picker="{dateFormat: \'yy-mm-dd\'}" ng-model="x"/>')($rootScope);
    $rootScope.x = dateObj;
    $rootScope.$digest();
    // Now change the data in the input box
    dateString = '2012-8-01';
    dateObj = $.datepicker.parseDate('yy-mm-dd', dateString);
    element.val(dateString);
    element.trigger("change");
    expect(element.datepicker('getDate')).toEqual(dateObj);
    expect(element.val()).toEqual('2012-08-01');
    $rootScope.$digest();
    expect($rootScope.x).toEqual(dateObj);
  });

  describe('when attribute options change', function() {
    it('should watch attribute and update date widget accordingly', function() {
      var element;
      $rootScope.config = {
        minDate: 5
      };
      element = $compile("<input date-picker='config' ng-model='x'/>")($rootScope);
      $rootScope.$digest();
      expect(element.datepicker("option", "minDate")).toBe(5);
      $rootScope.config.minDate = 10;
      $rootScope.$digest();
      expect(element.datepicker("option", "minDate")).toBe(10);
    });
  });

  describe('使用ng-required指令', function() {
    it('should be invalid initially', function() {
      var aDate, element;
      aDate = new Date(2010, 12, 1);
      element = $compile("<input date-picker ng-model='x' ng-required='true' />")($rootScope);
      $rootScope.$digest();
      expect(element.hasClass('ng-invalid')).toBeTruthy();
    });
    it('如果模型被指定应该是有效的', function() {
      var aDate, element;
      aDate = new Date(2010, 12, 1);
      element = $compile("<input date-picker ng-model='x' ng-required='true' />")($rootScope);
      $rootScope.x = aDate;
      $rootScope.$digest();
      expect(element.hasClass('ng-valid')).toBeTruthy();
    });
    it('应该是有效的在日期被选取之后', function() {
      var aDate, element;
      aDate = new Date(2010, 12, 1);
      element = $compile("<input date-picker ng-model='x' ng-required='true' />")($rootScope);
      $rootScope.$digest();
      selectDate(element, aDate);
      expect(element.hasClass('ng-valid')).toBeTruthy();
    });
  });

  describe('在一个div元素', function() {
    describe('simple use', function() {
      it('应该能够从模型获得的日期', function() {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div date-picker ng-model='x'></div>")($rootScope);
        $rootScope.x = aDate;
        $rootScope.$digest();
        expect(element.datepicker('getDate')).toEqual(aDate);
      });
      it('应该放日期在模型中', function() {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div date-picker ng-model='x'></div>")($rootScope);
        $rootScope.$digest();
        selectDate(element, aDate);
        expect($rootScope.x).toEqual(aDate);
      });
    });
    describe('with ng-required directive', function() {
      it('should be invalid initially', function() {
        var element = $compile("<div date-picker ng-model='x' ng-required='true' ></div>")($rootScope);
        $rootScope.$digest();
        expect(element.hasClass('ng-invalid')).toBeTruthy();
      });
      it('should be valid if model has been specified', function() {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div date-picker ng-model='x' ng-required='true' ></div>")($rootScope);
        $rootScope.x = aDate;
        $rootScope.$digest();
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
      it('should be valid after the date has been picked', function() {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div date-picker ng-model='x' ng-required='true' ></div>")($rootScope);
        $rootScope.$digest();
        selectDate(element, aDate);
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
  });
});

