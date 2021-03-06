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
            var herschelsupply_item = {};

            var $linkurl = url;
            var $title = $('h2[itemprop="name"]').text();
            var $partnumber = $('.sku').text();
            var $sizes = [];
            $sizes[0] = "N/A";
            var $colors = [];
            $colors[0] = $('.product-color').text();
            var $price = $('span.product-price').text().slice(1);
            var $weight = "N/A";
            var $dimension = $('p.dimension').text();
            var $description = $('#product-details > div.middle-block.large-4.medium-4.small-12.columns.left > p').text();

            var $detail_descs = [];
            $('#product-details > div.middle-block.large-4.medium-4.small-12.columns.left > ul > li').each(function(i, elem) {
                $detail_descs[i] = $(this).text();
            });

            var $imageURLs = [];
            $('#product-thumbs > ul > li > img').each(function(i, elem) {
                $imageURLs[i] = 'http:' + $(this).attr('src');
            })

            // var $img = 'http:' + $('img.product-image').attr('src');
            // var $desc = $('.heightContainer img').attr('alt');



            var herschelsupply_item = {
                // imageURLs: $img,
                url: $linkurl,
                title: 'HERSCHEL SUPPLY - ' + $title,
                partnumber: $partnumber,
                sizes: $sizes,
                weight: $weight,
                colors: $colors,
                price: $price,
                dimension: $dimension,
                description: $description,
                detail_descs: $detail_descs,
                imageURLs: $imageURLs
                    // desc: $desc
            }

            // console.log(herschelsupply_item);
            // respond with the final JSON object
            cb(herschelsupply_item);
        }
    });
}
