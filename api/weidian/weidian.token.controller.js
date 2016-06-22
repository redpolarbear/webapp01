'use strict';

var request = require('request');

var secret =

exports.getToken = function(req, res) {
  var weidianAPI_url =
  var secret =
  var key =

  request.post(weidianAPI_url, {})

};

exports.saveToken = function(req, res) {

};

exports.validateToken = function(req, res) {

};
