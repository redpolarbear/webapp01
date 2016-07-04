'use strict';

var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');
var scrapeItem = require('./models/item.model');
var express = require('express');
var path = require('path');
var utils = require('../utils/utils.js');

var scrapers = {};

scrapers['herschelsupply'] = require('./scrapers/herschelsupply');
scrapers['mec'] = require('./scrapers/mec');
scrapers['lululemon'] = require('./scrapers/lululemon');


exports.scrape = function(req, res) {
    var url = req.body.url;
    var scraperToUse;

    if (url.indexOf("herschelsupply") > -1) {
        scraperToUse = 'herschelsupply';
    } else if (url.indexOf("mec.ca") > -1) {
        scraperToUse = 'mec';
    } else if (url.indexOf("lululemon.com") > -1) {
        scraperToUse = 'lululemon';
    } else {
      console.log('cannot locate scraper');
    };

    scrapers[scraperToUse].list(url, function(data) {
        // console.log('data from scraper: ', data);
        res.json(data);
    });
};

exports.itemSave = function(req, res) {
    var newScrapeItem = new scrapeItem();
    newScrapeItem.url = req.body.url;
    newScrapeItem.partnumber = req.body.partnumber;
    newScrapeItem.sizes = req.body.sizes;
    newScrapeItem.colors = req.body.colors;
    newScrapeItem.title = req.body.title;
    newScrapeItem.price = req.body.price;
    newScrapeItem.weight = req.body.weight;
    newScrapeItem.dimension = req.body.dimension;
    newScrapeItem.description = req.body.description;
    newScrapeItem.detail_descs = req.body.detail_descs;

    newScrapeItem.imageURLs = req.body.imageURLs;

    var imgs = req.body.imageURLs;
    var imgs_local_names = [];

    imgs.forEach(function(item, index) {
        var random = utils.randomizer(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        var filename = 'images/item_imgs/' + random + '.png'
        newScrapeItem.imageLocalURLs[index] = filename;
        utils.downloadURI(imgs[index], 'public/' + filename, function(filename) {
            console.log('done');
        });
    });

    // newScrapeItem.imageLocalURLs = imgs_local_names;

    newScrapeItem.save(function(err, newItem) {
        if (err) {
            res.send('error saving the new item.');
        } else {
            console.log(newItem);
            res.send(newItem);
        };


    });
};
