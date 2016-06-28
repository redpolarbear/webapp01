'use strict';

var request = require('request');
var fs = require('fs');
var tokenCtrl = require('./weidian.token.controller');

exports.uploadImage = function(req, res) {
        var weidianAPI_url = 'http://api.vdian.com/media/upload';
        var access_token = req.body.access_token;
        var uploadImgFile = 'public/' + req.body.img;

        var formdata = {
            media: fs.createReadStream(uploadImgFile),
            access_token: access_token,
        };
        request.post({
            url: weidianAPI_url,
            formData: formdata
        }, function(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed: ', err);
            };
            console.log('upload successful! response: ', body);
            res.json(body);
        });
};

exports.uploadProduct = function(req, res) {
        var weidianAPI_url = 'https://api.vdian.com/api';
        var param = {
            price: req.body.price,
            stock: req.body.stock,
            itemName: req.body.itemName,
            bigImgs: req.body.bigImgs,
            titles: req.body.titles,
            cate_id: req.body.cate_id,
            free_delivery: req.body.free_delivery,
            remote_free_delivery: req.body.remote_free_delivery
        };

        var public_params = {
            method: "vdian.item.add",
            access_token: req.body.access_token,
            version: "1.1",
            format: "json"
        };

        console.log(JSON.stringify(param));
        console.log(JSON.stringify(public_params));

        request.post({
            url: weidianAPI_url,
            form: {
                param: JSON.stringify(param),
                public: JSON.stringify(public_params)
            }
        }, function(err, response, body) {
            if (err) {
                return console.error('upload failed: ', err);
            };
            console.log('upload successful! response: ', body);
            res.json(body);
        });
        // request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
};


// https://api.vdian.com/api?param={"price":"1.5","stock":"5","itemName":"接口测试商品1","sku":[{"stock":1,"title":"型号1","price":"1"},{"stock":1,"title":"型号2","price":"1.5"}],"bigImgs":["http://wd.geilicdn.com/vshop395640-1390204649-1.jpg","http://wd.geilicdn.com/vshop395640-1390204649-2.jpg"],"titles":["图片1","图片2"],"cate_id":"747864,747860","free_delivery":"1","remote_free_delivery":"1"}&public={"method":"vdian.item.add","access_token":"xxx","version":"1.1","format":"json"}
