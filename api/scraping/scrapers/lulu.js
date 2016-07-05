var casper = require('casper').create({
    pageSettings: {
        webSecurityEnabled: false
    }
    , viewportSize: {
        width: 1980
        , height: 1080
    }
//    , verbose: true
//    , logLevel: "info"
});
var x = require('casper').selectXPath;
var mouse = require("mouse").create(casper);
//var fs = require('fs');
//var filename_text = "";
//var modelname_text = "";
//var url = "http://shop.lululemon.com/p/women-shorts/Hotty-Hot-Short-Long/_/prod1510028?rcnt=3&N=1z13ziiZ7z5&cnt=31&color=LW7FDQS_024838";
casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.72 Safari/537.36');
casper.start(casper.cli.get(0), function () {
//casper.start("http://shop.lululemon.com/p/women-shorts/Hotty-Hot-Short/_/prod3470302?rcnt=1&N=1z13ziiZ7z5&cnt=31&color=LW7997S_023188", function () {
    var lululemon_item = {
        title: ""
        , partnumber: ""
        , price: ""
        , skus: []
            //        {
            //            color: ""
            //            , sizes: []
            //        }
        , description: ""
        , desc_details: []
            //{
            //            head: "",
            //            desc: "",
            //            lists: []
            //}
         , imageURLs: []
    };
    for (var n = 1; n < 20; n++) {
        casper.thenClick('#pdp-form > section.section-color-swatch > div.color-swatch.show-one-hook.closed > div > div > span:nth-child(' + n + ') > a', function (l) {
            casper.wait(1000, function (m) {
                if (lululemon_item.skus.length == 0) {
                    //get the price
                    var price_text = this.evaluate(function () {
                        return document.querySelector('#pdp-product-attributes > div > div > div > div > div > div > div.product-description.duplicated > div.price-fixed').textContent.trim();
                    });
                    if (price_text == null) {
                        price_text = this.evaluate(function () {
                            return document.querySelector('#pdp-product-attributes > div > div > div > div > div > div > div.product-description.duplicated > div.price-markdown > div.price-sale').textContent.trim();
                        });
                    };
                    lululemon_item.price = price_text;
                    //get the name of the title
                    var title_text = this.evaluate(function () {
                        return document.querySelector('#pdp-product-attributes > div > div > div > div > div > div > div.product-description.duplicated > h1').textContent.trim();
                    });
                    lululemon_item.title = title_text;
                    //get the "why we made this" - description
                    var why_text = this.evaluate(function () {
                        return document.querySelector('#pdp-why-we-made-it > div.dotdotdot > div').textContent.trim();
                    });
                    lululemon_item.description = why_text;
                    //get the partnumber = "n/a"
                    lululemon_item.partnumber = 'N/A';
                    // get the description detail
                    var desc_detail_heads = this.evaluate(function () {
                        return Array.prototype.map.call(document.querySelectorAll('#fabric > h4'), function (e) {
                            return e.textContent.trim();
                        });
                    });
                    var desc_detail_descs = this.evaluate(function () {
                        return Array.prototype.map.call(document.querySelectorAll('#fabric > p'), function (e) {
                            return e.textContent.trim();
                        })
                    })
                    var desc_detail_lists_array = [];
                    for (var i = 3; i < 10; i = i + 3) {
                        desc_detail_lists_array.push(this.evaluate(function (n) {
                            return Array.prototype.map.call(document.querySelectorAll('#fabric > ul:nth-child(' + n + ') > li'), function (e) {
                                return e.textContent.trim();
                            });
                        }, {
                            n: i
                        }));
                    };
                    for (var i = 0; i < desc_detail_heads.length; i++) {
                        lululemon_item.desc_details.push({
                            head: desc_detail_heads[i]
                            , desc: desc_detail_descs[i]
                            , list: desc_detail_lists_array[i]
                        });
                    };
                };
                //get the number of colors
                var color_number = this.evaluate(function () {
                    return document.querySelector('#pdp-form > section.section-color-swatch > div.sub-section-heading > span').textContent.trim();
                });
                //get the color name
                var color_text = this.evaluate(function () {
                    return document.querySelector('#pdp-form > section.section-color-swatch > div.selected-color-wrapper > span').textContent.trim();
                });
                //get the sizes under the one color
                var sizes_array = this.evaluate(function () {
                    return Array.prototype.map.call(document.querySelectorAll('#select-size > option'), function (e) {
                        return e.textContent.trim();
                    });
                });
                sizes_array = sizes_array.slice(1);
                //get the image urls
                var image_urls_array = this.evaluate(function () {
                    return Array.prototype.map.call(document.querySelectorAll('#pdp-media-section > section > div > ul > li > a > picture > img'), function (e) {
                        return e.getAttribute('srcset');
                    });
                });
                lululemon_item.skus.push({
                    color: color_text
                    , sizes: sizes_array
                });
                lululemon_item.imageURLs.push({
                    colorName: color_text
                    , imageUrls: image_urls_array
                });
                color_number = parseInt(color_number);
                if (color_number > 9) { color_number = 9};
                //because if the number of the pictures is more than 9, there is one icon link for the expansion instead of the color link.
                if (lululemon_item.skus.length == color_number) {
                    this.echo(JSON.stringify(lululemon_item))
                };
            });
        });
    };
});
casper.run();
//    // get the description detail
//    var desc_detail_heads = this.evaluate(function () {
//        return Array.prototype.map.call(document.querySelectorAll('#fabric > h4'), function (e) {
//            return e.textContent.trim();
//        });
//    });
//    var desc_detail_descs = this.evaluate(function () {
//        return Array.prototype.map.call(document.querySelectorAll('#fabric > p'), function (e) {
//            return e.textContent.trim();
//        })
//    })
//    var desc_detail_lists_array = [];
//    for (var i = 3; i < 10; i = i + 3) {
//        desc_detail_lists_array.push(this.evaluate(function (n) {
//            return Array.prototype.map.call(document.querySelectorAll('#fabric > ul:nth-child(' + n + ') > li'), function (e) {
//                return e.textContent.trim();
//            });
//        }, {
//            n: i
//        }));
//    };
//    for (var i = 0; i < desc_detail_heads.length; i++) {
//        lululemon_item.desc_details.push({
//            head: desc_detail_heads[i]
//            , desc: desc_detail_descs[i]
//            , list: desc_detail_lists_array[i]
//        });
//    };
//    //get sizes and color
//    var color_text = this.evaluate(function () {
//        return document.querySelector('#pdp-form > section.section-color-swatch > div.selected-color-wrapper > span').textContent.trim();
//    });
//    var sizes_array = this.evaluate(function () {
//        return Array.prototype.map.call(document.querySelectorAll('#select-size > option'), function (e) {
//            return e.textContent.trim();
//        });
//    });
//    sizes_array = sizes_array.slice(1);
//    lululemon_item.skus.push({
//        color: color_text
//        , sizes: sizes_array
//    });
//    //get the image urls
//    var image_urls_array = this.evaluate(function () {
//        return Array.prototype.map.call(document.querySelectorAll('#pdp-media-section > section > div > ul > li > a > picture > img'), function (e) {
//            return e.getAttribute('srcset');
//        });
//    });
//    lululemon_item.imageURLs.push({
//        colorName: color_text
//        , imageUrls: image_urls_array
//    });
//
//    this.echo(JSON.stringify(lululemon_item));
//  -----
//    var desc_detail_head = "";
//    var desc_detail_desc = "";
//    var desc_detail_list = [];
//
//    lululemon_item.desc_details = this.evaluate(function () {
//        for (var i = 1; i < 5; i++) {
//            desc_detail_head = document.querySelector('#fabric > h4:nth-child(' + i + ')').textContent.trim();
//            desc_detail_desc = document.querySelector('#fabric > p:nth-child(' + i + 1 + ')').textContent.trim();
//            desc_detail_list = Array.prototype.map.call(document.querySelectorAll('#fabric > ul:nth-child(' + i + 2 + ') >li'), function (e) {
//                return e.textContent.trim();
//            });
//            lululemon_item.desc_details.push({
//                head: desc_detail_head
//                , desc: desc_detail_desc
//                , list: desc_detail_list
//            });
//        };
//        return lululemon_item.desc_details;
//    });
// -----
//------
//this.click(x('//*[@id="color-025038"]/a'), function () {
//        casper.wait(20000, function () {
//            //get sizes and color
//            var color_text = this.evaluate(function () {
//                return document.querySelector('#pdp-form > section.section-color-swatch > div.selected-color-wrapper > span').textContent.trim();
//            });
//            var sizes_array = this.evaluate(function () {
//                return Array.prototype.map.call(document.querySelectorAll('#select-size > option'), function (e) {
//                    return e.textContent.trim();
//                });
//            });
//            sizes_array = sizes_array.slice(1);
//            lululemon_item.skus.push({
//                color: color_text
//                , sizes: sizes_array
//            });
//            //get the image urls
//            var image_urls_array = this.evaluate(function () {
//                return Array.prototype.map.call(document.querySelectorAll('#pdp-media-section > section > div > ul > li > a > picture > img'), function (e) {
//                    return e.getAttribute('srcset');
//                });
//            });
//            lululemon_item.imageURLs.push({
//                colorName: color_text
//                , imageUrls: image_urls_array
//            });
//        });
//    });
//});
//---
