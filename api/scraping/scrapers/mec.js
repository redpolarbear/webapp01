'use strict';

var request = require('request');
var cheerio = require('cheerio');

exports.list = function(url, cb) {
    request(url, function(error, resp, body) {
        if (error) {
            cb({
                error: error
            });
        }
        if (!error) {
            var $ = cheerio.load(body);
            var mec_item = {};

            var $linkurl = url;
            var $title = $('#gearNotes > p:nth-child(1) > b').text(); //ok
            var $partnumber = $('#gearNotes > p:nth-child(2) > span.prNm').text().slice(16); //ok
            var $price = $('#idPrdPrice > span:nth-child(1)').text();
            var price_length = $price.length;
            $price = $price.slice(1, price_length - 7); //ok
            var $weight = $('#gearNotes > p:nth-child(3)').text().slice(8);
            var $dimension = $('#specchart > tbody > tr:nth-child(9) > td').text() +
                             ' x ' + $('#specchart > tbody > tr:nth-child(10) > td').text() +
                             ' x ' + $('#specchart > tbody > tr:nth-child(11) > td').text() +
                             ' ' + $('#specchart > tbody > tr:nth-child(8) > td').text();
            var $description = $('#longdesc > p').text(); //ok

            var $detail_descs = [];
            $('#longdesc > ul > li').each(function(i, elem) {
                $detail_descs[i] = $(this).text();
            }); //ok

            var $imageURLs = [];
            $('#skuColours > ul > li > a').each(function(i, elem) {
                $imageURLs[i] = $(this).attr('href');
            });

            var $colors = [];
            $('#skuColours > ul > li > a > img').each(function(i, elem) {
                $colors[i] = $(this).attr('title');
            }); //ok

            var mec_item = {
                // imageURLs: $img,
                url: $linkurl,
                title: 'MEC - ' + $title,
                partnumber: $partnumber,
                colors: $colors,
                weight: $weight,
                price: $price,
                dimension: $dimension,
                description: $description,
                detail_descs: $detail_descs,
                imageURLs: $imageURLs
                    // desc: $desc
            }

            // console.log(herschelsupply_item);
            // respond with the final JSON object
            cb(mec_item);
        }
    });
}
