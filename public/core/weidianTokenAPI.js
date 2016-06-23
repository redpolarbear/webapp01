'use strict';

angular
    .module('itemApp')
    .factory('weidianTokenAPI', weidianTokenAPI);

weidianTokenAPI.$inject = ['$http'];

function weidianTokenAPI($http) {
  return {
      weidianGetToken: weidianGetToken
  }
  function weidianToken() {
        return $http.post('/api/gettoken', );
    }
};
