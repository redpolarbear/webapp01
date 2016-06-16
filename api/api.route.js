'use strict';

// var controller = require('./look.controller');
var controller = require('./scraping/scraping.controller');
var express = require('express');

var router = express.Router();

// router.post('/scrape', function(req, res) {
//   var url = req.body.url;
//   res.send('scrape ' + url);
// });

router.post('/scrape', controller.scrape);

module.exports = router;
