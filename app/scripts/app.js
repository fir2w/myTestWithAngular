'use strict';

angular.module('firstApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/pagination-demo', {
        templateUrl: 'views/paginationDemo.html',
        controller: 'MainCtrl'
      })
      .when('/datepicker-demo', {
        templateUrl: 'views/datepicker-demo.html',
        controller: 'DatepickerDemoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
   // $locationProvider.html5Mode(true);
  });
