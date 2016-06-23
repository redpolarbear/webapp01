'use strict';

angular
    .module('itemApp')
    .factory('weidianTokenAPI', weidianTokenAPI);

weidianTokenAPI.$inject = ['$http'];

function weidianTokenAPI($http) {
  return {
      weidianGetToken: weidianGetToken
  }
  function weidianGetToken() {
        return $http.get('/api/gettoken');
    }
};
