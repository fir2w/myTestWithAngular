'use strict';

angular.module('firstApp')
  .factory('Users', function() {
    var Users = { };
    Users.query = function(query, response) {
      // We capture the response so that the tests can call it with their own data
      Users.respondWith = function(emails) {
        response(emails);
        Users.respondWith = undefined;//? 不能调用2次？
      };
    };
    return Users;
  });
