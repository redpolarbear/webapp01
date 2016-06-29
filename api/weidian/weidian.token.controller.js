'use strict';

var request = require('request');
var TokenItem = require('./models/weidianToken.model');
// var express = require('express');
// var app = express();

var appkey = '659335';
var secret = '57371ee83d9f8b64f8a497af09ce1ffb';

exports.returnToken = function(req, res) {
    getToken(function(result) {
        // console.log(result);
        res.json(result);
    });
};


function getToken(callback) {
    // var Token = {};
    TokenItem.findOne({})
        .sort({
            createTime: -1
        })
        .exec(function(err, newToken) {
            if (err) {
                console.log(err);
            };
            // console.log(newToken);
            // Token = newToken;
            if (!newToken || !validateToken(newToken)) {
                console.log('no token existing, renewToken now');
                renewToken(function(newToken) {
                    // console.log('renew1: \n' + newToken);
                    saveToken(newToken);
                    newToken = JSON.parse(newToken); //JSON the return from renewToken, otherwise it's the String.
                    callback(newToken);
                });
            } else {
                // console.log('the existing token is valid.');
                // console.log(newToken.result.access_token);
                // console.log(newToken);
                callback(newToken);
            };
        });
};

function validateToken(TokenObj) {
    // var TokenObj = JSON.parse(TokenString);
    var createTime = Date.parse(TokenObj.createTime);
    var expire_in = parseInt(TokenObj.result.expire_in);

    var todayTime = new Date();
    todayTime = todayTime.toISOString();
    todayTime = Date.parse(todayTime);
    // var todayTime = Date.parse("2016-06-26T06:28:43.398Z");

    if (todayTime / 1000 - createTime / 1000 - expire_in < 0) {
        return true;
    } else {
        return false;
    }
};

function renewToken(callback) {
    var weidianAPI_url = 'https://api.vdian.com/token?grant_type=client_credential&';
    //https://api.vdian.com/token?grant_type=client_credential&appkey=xxx&secret=xxx
    weidianAPI_url = weidianAPI_url + 'appkey=' + appkey + '&secret=' + secret;

    request.get(weidianAPI_url, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            // console.log(body);
            callback(body);
            // saveToken(res.json(body));
            // return: {
            //     "result": {
            //         "access_token": "xxx",
            //         "expire_in": 90000
            //     },
            //     "status": {
            //         "status_code": 0,
            //         "status_reason": "success"
            //     }
            // }
        };
    });
};


function saveToken(return_token) {
    var tokenObj = JSON.parse(return_token);
    var newTokenItem = new TokenItem();
    // var token
    newTokenItem.result.access_token = tokenObj.result.access_token;
    newTokenItem.result.expire_in = tokenObj.result.expire_in;

    newTokenItem.save(function(err, newToken) {
        if (err) {
            console.log(err);
        } else {
            console.log('Token saved successfully!');
            // console.log(newToken.result.access_token);
            // callback(newToken);
            // return newToken;
        }
    });
};


// var requestToken = function() {
//     request.get('http://192.168.33.10:9000/api/renewtoken', function(err, response, body) {
//         if (err) {
//             console.log(err);
//         } else {
//             //  return JSON.parse(body);
//             console.log('request for the new Token: ' + body);
//             // return body;
//             // Token = JSON.parse(body);
//         }
//     });
// };
