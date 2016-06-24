'use strict';

var request = require('request');
var fs = require('fs');
var tokenCtrl = require('./weidian.token.controller');

exports.uploadImage = function(req, res) {
    tokenCtrl.getToken(function(newToken) {
        var weidianAPI_url = 'http://api.vdian.com/media/upload';
        var access_token = newToken.result.access_token;
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
            }
            console.log('upload successful! response: ', body);
            res.json(body);
        });
    });
};
