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
            var $title = $('h2[itemprop="name"]').html();
            var $color = $('.product-color').html();
            var $price = $('span.product-price').html();
            // var weight =
            var $dimension = $('p.dimension').html();
            var $description = $('#product-details > div.middle-block.large-4.medium-4.small-12.columns.left > p').html();

            var $detail_desc = [];
            $('#product-details > div.middle-block.large-4.medium-4.small-12.columns.left > ul > li').each(function(i, elem) {
              $detail_desc[i] = $(this).text();
            });

            var $imageURLs = [];
            $('.product-image').each(function(i, elem) {
              $imageURLs[i] = 'http:' + $(this).attr('src');
            })


            // var $img = 'http:' + $('img.product-image').attr('src');
            // var $desc = $('.heightContainer img').attr('alt');



            var herschelsupply_item = {
                // imageURLs: $img,
                url: $linkurl,
                title: $title,
                color: $color,
                price: $price,
                dimension: $dimension,
                description: $description,
                detail_desc: $detail_desc,
                imageURLs: $imageURLs
                // desc: $desc
            }

            console.log(herschelsupply_item);
            // respond with the final JSON object
            cb(herschelsupply_item);
        }
    });
}
