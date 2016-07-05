'use strict';
var request = require('request');
var cheerio = require('cheerio');
var spawn = require('child_process').spawn;

exports.list = function (url, cb) {
    getLululemon(url, function(data) {
        var lululemon = JSON.parse(data);
        console.log(lululemon);
        var $title = 'lululemon - ' + lululemon.title;
        var $partnumber = lululemon.partnumber;
        var $price = lululemon.price.slice(1, lululemon.price.length - 5);
        var $weight = 'N/A';
        var $dimension = 'N/A';
        var $description = lululemon.description;
        var $sizes = [];
        $sizes[0] = 'Please see the COLORS!';
        var $colors = [];
        for (var i = 0; i < lululemon.skus.length; i++) {
            $colors.push(lululemon.skus[i].color + "\n- " + lululemon.skus[i].sizes.join(", "));
        };
//        console.log($colors);
        var $detail_descs = [];
        for (var n = 0; n < lululemon.desc_details.length; n++) {
            $detail_descs.push(lululemon.desc_details[n].head + "\n" + lululemon.desc_details[n].desc + "\n-- " + lululemon.desc_details[n].list.join("\n-- "));
        };
//        console.log($detail_descs);
        var $imageURLs = [];
        for (var m = 0; m < lululemon.imageURLs.length; m++) {
          $imageURLs = $imageURLs.concat(lululemon.imageURLs[m].imageUrls);
        };
//        $imageURLs.concat(lululemon.imageURLs[0].imageUrls);
//        console.log(lululemon.imageURLs[0].imageUrls));
        console.log($imageURLs);

        var lululemon_item = {
            url: url
            , title: $title
            , partnumber: $partnumber
            , price: $price
            , sizes: $sizes
            , weight: $weight
            , dimension: $dimension
            , description: $description
            , colors: $colors
            , detail_descs: $detail_descs
            , imageURLs: $imageURLs
        };
        cb(lululemon_item);
    });
};

function getLululemon(url, callback) {
    var bin = 'casperjs';
    var args = [];
    args[0] = 'api/scraping/scrapers/lulu.js';
    args[1] = url;
    var runCasperjs = spawn(bin, args);
    runCasperjs.stdout.setEncoding('utf8');
    runCasperjs.stdout.on('data', function (data) {
//        console.log(data);
        callback(data);
    });
};

    //    request(url, function(error, resp, body) {
    //        if (error) {
    //            cb({
    //                error: error
    //            });
    //        }
    //        if (!error) {
    //            var $ = cheerio.load(body);
    //            var herschelsupply_item = {};
    //
    //            var $linkurl = url;
    //            var $title = $('h2[itemprop="name"]').text();
    //            var $partnumber = $('.sku').text();
    //            var $sizes = [];
    //            $sizes[0] = "N/A";
    //            var $colors = [];
    //            $colors[0] = $('.product-color').text();
    //            var $price = $('span.product-price').text().slice(1);
    //            var $weight = "N/A";
    //            var $dimension = $('p.dimension').text();
    //            var $description = $('#product-details > div.middle-block.large-4.medium-4.small-12.columns.left > p').text();
    //
    //            var $detail_descs = [];
    //            $('#product-details > div.middle-block.large-4.medium-4.small-12.columns.left > ul > li').each(function(i, elem) {
    //                $detail_descs[i] = $(this).text();
    //            });
    //
    //            var $imageURLs = [];
    //            $('#product-thumbs > ul > li > img').each(function(i, elem) {
    //                $imageURLs[i] = 'http:' + $(this).attr('src');
    //            })
    //
    //            // var $img = 'http:' + $('img.product-image').attr('src');
    //            // var $desc = $('.heightContainer img').attr('alt');
    //
    //
    //
    //            var herschelsupply_item = {
    //                // imageURLs: $img,
    //                url: $linkurl,
    //                title: 'HERSCHEL SUPPLY - ' + $title,
    //                partnumber: $partnumber,
    //                sizes: $sizes,
    //                weight: $weight,
    //                colors: $colors,
    //                price: $price,
    //                dimension: $dimension,
    //                description: $description,
    //                detail_descs: $detail_descs,
    //                imageURLs: $imageURLs
    //                    // desc: $desc
    //            }
    //
    //            // console.log(herschelsupply_item);
    //            // respond with the final JSON object
    //            cb(herschelsupply_item);
    //        }
    //    });
