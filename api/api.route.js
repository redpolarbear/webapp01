'use strict';

// var controller = require('./look.controller');
var scrapingController = require('./scraping/scraping.controller');
var weidianController = require('./weidian/weidian.controller');
var weidianTokenController = require('./weidian/weidian.token.controller');

var express = require('express');

var router = express.Router();

// router.post('/scrape', function(req, res) {
//   var url = req.body.url;
//   res.send('scrape ' + url);
// });

router.post('/scrape', scrapingController.scrape);
router.post('/save', scrapingController.itemSave);
router.post('/uploadimg', weidianController.uploadImg);
// router.post('/weidian/add', weidian_controller.addItem);

router.get('/renewtoken', weidianTokenController.renewToken);

module.exports = router;
