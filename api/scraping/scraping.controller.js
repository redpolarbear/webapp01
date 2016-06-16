'use strict';

var request = require('request');
var cheerio = require('cheerio');

var scrapers = {};

scrapers['herschelsupply'] = require('./scrapers/herschelsupply');

exports.scrape = function(req, res) {
  var url = req.body.url;
  var scraperToUse;

  if (url.indexOf("herschelsupply") > -1) {
    scraperToUse = 'herschelsupply';
  } else {
    console.log('cannot locate scraper');
  }

  scrapers[scraperToUse].list(url, function(data) {
    // console.log('data from scraper: ', data);
    res.json(data);
  });
}
