    'use strict';

    angular
        .module('itemApp')
        .factory('scrapeAPI', scrapeAPI);

    scrapeAPI.$inject = ['$http'];

    function scrapeAPI($http) {
        return {
            getScrapeDetails: getScrapeDetails
        }
        function getScrapeDetails(link) {
            return $http.post('/api/additem/scrape', link);
        }
    };
