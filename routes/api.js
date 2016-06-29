'use strict';

var controller = require('../api/scraping/scraping.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('this is the apis GET');
});

router.post('/scrape', function(req, res) {
  var url = req.body.url;
  res.send('scrape ' + url);
});

module.exports = router;
