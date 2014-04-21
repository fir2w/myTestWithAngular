'use strict';

angular.module('firstApp')
  .directive('datePicker', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {

        //更新模型
        var updateModel = function () {
          scope.$apply(function () {//$apply()是用于执行一个表达式适用于angular之外的框架
            var date = element.datepicker("getDate");//某个元素datepicker()，会生成jquery 的datepicker对象。
            element.datepicker("setDate", element.val());
            ngModelCtrl.$setViewValue(date);//引发pass
          });
        };

        var onSelectHandler = function (userHandler) {
          if (userHandler) {
            // Caller has specified their own onSelect handler 调用者指定自己的onSelect处理程序,同时更新模型
            // so call this as well as updating the model
            return function (value, picker) {
              updateModel();
              return userHandler(value, picker);
            };
          } else {//默认的只更新模型
            return updateModel;
          }
        };

        var setUpDatePicker = function () {
          var options = scope.$eval(attrs.datePicker) || {};
          // Bind to the date picker select event
          options.onSelect = onSelectHandler(options.onSelect);//onSelect如果存在，选取值改变后，更新模型
          // In case the user changes the text directly in the input box
          //如果用户更改直接在输入框的文本
          element.bind('change', updateModel);
          // Remove any previous date picker, to ensure any config changes are picked up
          //删除任何以前的日期选择器,以确保任何配置更改
          element.datepicker('destroy');
          // 创建新的datepicker小部件
          element.datepicker(options);
          // Render will update the date picker with the date
          ngModelCtrl.$render();
        };

        ngModelCtrl.$formatters.push(function (date) {
          if (angular.isDefined(date) && date !== null && !angular.isDate(date)) {//不是一个日期对象
            throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date);
          }
          return date;
        });

        //覆盖的方法
        ngModelCtrl.$render = function () {
          element.datepicker("setDate", ngModelCtrl.$viewValue);
        };

        // Watch for changes to the directives options
        scope.$watch(attrs.datePicker, setUpDatePicker, true);
      }
    };
  });
