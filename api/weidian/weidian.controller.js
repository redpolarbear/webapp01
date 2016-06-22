<<<<<<< HEAD
'use strict';

var request = require('request');
var fs = require('fs');

exports.uploadImg = function(req, res) {
    // res.send(req.body.url);

    var weidianAPI_url = 'http://api.vdian.com/media/upload';
    var access_token = '55df06abb80d287ec365555793b7c277000502344c';
    var uploadImgFile = 'public/' + req.body.imgFile;

    console.log(uploadImgFile);

    var formdata = {
        media: fs.createReadStream(uploadImgFile),
        access_token: access_token,
    }

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

};

exports.getToken = function(req, res) {
  var weidianAPI_url =
  var secret =
  var key =

  request.post(weidianAPI_url, {})

};
=======
'use strict';

var request = require('request');
var fs = require('fs');

exports.uploadImg = function(req, res) {
    // res.send(req.body.url);

    var weidianAPI_url = 'http://api.vdian.com/media/upload';
    var access_token = '55df06abb80d287ec365555793b7c277000502344c';
    var uploadImgFile = 'public/' + req.body.imgFile;

    console.log(uploadImgFile);

    var formdata = {
        media: fs.createReadStream(uploadImgFile),
        access_token: access_token,
    }

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

};

exports.getToken = function(req, res) {
  var weidianAPI_url =
  var secret =
  var key =

  request.post(weidianAPI_url, {})

};

exports.saveToken = function(req, res) {

};

exports.validateToken = function(req, res) {

};
>>>>>>> b48fa4b1622ffb04fb63cddea85b21ba4c82b15d
