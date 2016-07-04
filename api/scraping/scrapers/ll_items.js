var links = [];
var titles = [];
var casper = require('casper').create({
	pageSettings: {
        webSecurityEnabled: false
    },
    viewportSize : { width: 1980, height: 1080 },
    // verbose: true,
    // logLevel: "info"
});

var x = require('casper').selectXPath;

var mouse = require("mouse").create(casper);

var fs = require('fs');

var filename_text ="";
var modelname_text = "";


casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.72 Safari/537.36');


casper.start(casper.cli.get(0), function() {


});

/*casper.then(function() {
	// 6) get the color
	for (var k = 1; k < 99; k++) {

		var color_title = this.evaluate(function(n) {
			var color = document.querySelector('#swatches > li:nth-child(' + n +') > a');
			return color.getAttribute('title');
		},{
			n: k //casperjs passing params to evaluate
		});

		var color_rev = this.evaluate(function(n) {
			var color = document.querySelector('#swatches > li:nth-child(' + n +') > a');
			return color.getAttribute('rev');
		},{
			n: k //casperjs passing params to evaluate
		});

		if (color_title == null) {
			break;
		} else {
			// this.echo("Color " + k + ": " + color_title + " - " + color_rev); // print the color info.
		}
	}

});
*/

casper.then(function() {
	for (var m = 1; m < 99; m++) {

		casper.thenClick(x('//*[@id="swatches"]/li[' + m + ']/a'), function() {

			casper.wait (10000, function() {

				var color_active_rev = this.evaluate(function() {
					return document.querySelector('.pickColor.OneLinkNoTx.active').getAttribute('rev');
				});

				// 1) get the price
				var price_text = this.evaluate(function() {
					return document.querySelector('#price > span.amount').textContent.trim();
				});

				this.echo(price_text);
				this.echo(color_active_rev);

				// fs.write(filename_text,price_text + ";",'a');

				// 2) get the name of the cloth
				var title_text = this.evaluate(function() {
					return document.querySelector('#pageContent > div.container > div.subContainer > h1 > div').textContent.trim();
				});

				this.echo('【加拿大直邮含税】Lululemon - ' + title_text +' （2016 NEW）');
				this.echo('');
				this.echo('');

				modelname_text = title_text;
				filename_text = title_text + ".txt";

				// fs.write(filename_text,title_text + ";",'a');


				// 3) get the "why we made this"
				var why_text = this.evaluate(function() {
					return document.querySelector('#productImage > div.why-we-made-this').textContent.trim();
				});

				this.echo('Why We Made This:');
				this.echo('* ' + why_text);
				this.echo('');

				// 4) get the fabric + features
				var features_text = this.evaluate(function() {
					return Array.prototype.map.call(document.querySelectorAll('#productImage > div:nth-child(8) > ul > li'),function(e) {
						return e.textContent.trim();
					})
				});

				this.echo('- ' + features_text.join('\n- '));
				this.echo('');

				// 5) get the fit + function
				var functions_text = this.evaluate(function() {
					return Array.prototype.map.call(document.querySelectorAll('#productImage > div:nth-child(10) > ul > li'),function(e) {
						return e.textContent.trim();
					})
				});

				this.echo('+ ' + functions_text.join('\n+ '));
				this.echo('');

				//8) get the size list under the current color
				var sizes_text = this.evaluate(function() {
					return Array.prototype.map.call(document.querySelectorAll('.pickSize'),function(e) {
						return e.getAttribute('title');
					})
				});

				var color_active_title = this.evaluate(function() {
					return document.querySelector('.pickColor.OneLinkNoTx.active').getAttribute('title');
				});


				this.echo('【颜色和尺码】颜色：' + color_active_title + ' 有以下尺码：\n' + sizes_text.join(', '));
				this.echo('');

				var sizes_sold_out_text = this.evaluate(function() {
					return Array.prototype.map.call(document.querySelectorAll('.soldOut'),function(z) {
						return z.getAttribute('title');
					})
				});

				if (sizes_sold_out_text == "") {

				} else {
					this.echo('- 但是目前以下尺码缺货：\n' + sizes_sold_out_text.join(', '));
					this.echo('');
				}

				this.echo('关于如何选择最合适自己的尺码，请在订阅号“亚瑟的Funky俱乐部”中输入关键字：lululemon尺码');
				this.echo('');
				this.echo('备注：根据中国海关规定，境外发往中国的包裹，必须提交收货人身份证信息清关。');
				this.echo('为了能尽快发出包裹，请您在下单之后关注微信订阅号（亚瑟的Funky俱乐部），并联系上传收件人的身份证正反面，我们将保证您的个人信息安全。');
				this.echo('----- over -----');
				this.echo('');


				for (var l = 1; l < 20; l++) {
					var colorSrc_text = this.evaluate(function(v) {
						var colorSrc = document.querySelector('#img' + v + ' > img');
						return colorSrc.getAttribute('src');
					},{
						v: l
					});


					if (colorSrc_text == null) {
							break;
					} else {
						var rand = Math.round((Math.random()+1)*1000);
			  			var jpg_name = modelname_text + '_' + color_active_rev + "_" + rand +'.jpg';

			  			// 7) get the color picture
			  			//this.echo(" - The image has been saved to '" + jpg_name + "'");
			  			this.download(colorSrc_text,jpg_name);
					}
				}
			});
		});
	}
});


casper.run();
