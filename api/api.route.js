'use strict';

// var controller = require('./look.controller');
var scraping_controller = require('./scraping/scraping.controller');
var weidian_controller = require('./weidian/weidian.controller');

var express = require('express');

var router = express.Router();

// router.post('/scrape', function(req, res) {
//   var url = req.body.url;
//   res.send('scrape ' + url);
// });

router.post('/scrape', scraping_controller.scrape);
router.post('/save', scraping_controller.itemSave);
router.post('/weidian/uploadimgs', weidian_controller.uploadimgs);
router.post('/weidian/add', weidian_controller.addItem);

module.exports = router;
