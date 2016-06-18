'use strict';

angular.
  module('itemApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {

      $routeProvider.
        when('/scrapeitem', {
          template: '<scrape-item></scrape-item>'
        }).
        otherwise('/scrapeitem');
      // $locationProvider.hashPrefix('!');
      $locationProvider.html5Mode(true);
      // .hashPrefix('!');
    }
  ]);
