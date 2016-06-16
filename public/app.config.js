'use strict';

angular.
  module('itemApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {

      $routeProvider.
        when('/additem', {
          template: '<add-item></add-item>'
        }).
        otherwise('/additem');
      // $locationProvider.hashPrefix('!');
      $locationProvider.html5Mode(true);
      // .hashPrefix('!');
    }
  ]);
