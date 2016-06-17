'use strict';

angular
    .module('itemApp')
    .factory('saveItemAPI', saveItemAPI);

saveItemAPI.$inject = ['$http'];

function saveItemAPI($http) {
  return {
      saveScrapeDetails: saveScrapeDetails
  }
  function saveScrapeDetails(item) {
        return $http.post('/api/save', item);
    }
};
