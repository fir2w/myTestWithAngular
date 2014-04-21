'use strict';

angular.module('firstApp')
  .directive('uniqueEmail', ["Users", function (Users) {
    return {
      require:'ngModel',
      restrict:'A',
      link:function (scope, element, attrs, ngModelCtrl) {
        var original;

        // If the model changes, store this since we assume it is the current value of the user's email
        //如果模型发生变化,存储这个因为我们假定它是用户的电子邮件当前值,我们不想检查这个server,如果用户重新输入原始的email.
        // and we don't want to check the server if the user re-enters their original email
        ngModelCtrl.$formatters.unshift(function(modelValue) {//在头部加入,当模型值的变化是时，只是简单把原有值设为当前。
          original = modelValue;
          return modelValue;
        });

        // using push() here to run it as the last parser, after we are sure that other validators were run
        ngModelCtrl.$parsers.push(function (viewValue) {//尾部加入 每当控制器从DOM读值
          if (viewValue && viewValue !== original ) {//与原有值不相当
            Users.query({email:viewValue}, function (users) {
              if (users.length === 0) {//没有找到用户
                ngModelCtrl.$setValidity('uniqueEmail', true);//一个给定类型的验证错误是否有效,True表示如果没有错误
              } else {
                ngModelCtrl.$setValidity('uniqueEmail', false);
              }
            });
            return viewValue;
          }
        });
      }
    };
  }]);