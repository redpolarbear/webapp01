'use strict';

angular.
  module('itemApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/additem', {
          template: '<add-item></additem>'
        }).
        otherwise('/additem');
    }
  ]);
