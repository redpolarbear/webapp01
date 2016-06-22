'use strict';

angular
    .module('itemApp')
    .factory('weidianTokenAPI', weidianTokenAPI);

weidianTokenAPI.$inject = ['$http'];

function weidianTokenAPI($http) {
  return {
      weidianToken: weidianToken
  }
  function weidianToken() {
        return $http.post('/api/token', );
    }
};
