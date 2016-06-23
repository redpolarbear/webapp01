'use strict';

var request = require('request');
var TokenItem = require('./models/weidianToken.model');

var appkey = '659335';
var secret = '57371ee83d9f8b64f8a497af09ce1ffb';

exports.renewToken = function(req, res) {
    var weidianAPI_url = 'https://api.vdian.com/token?grant_type=client_credential&';
    //https://api.vdian.com/token?grant_type=client_credential&appkey=xxx&secret=xxx
    weidianAPI_url = weidianAPI_url + 'appkey=' + appkey + '&secret=' + secret;

    request.get(weidianAPI_url, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            // console.log(body);
            saveToken(body);
            res.json(body);

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
        }
    });
};

var saveToken = function(return_token) {
    var tokenObj = JSON.parse(return_token);
    var newTokenItem = new TokenItem();
    // var token
    newTokenItem.access_token = tokenObj.result.access_token;
    newTokenItem.expire_in = tokenObj.result.expire_in;

    newTokenItem.save(function(err, newToken) {
      if(err) {
        console.log(err);
      } else {
        console.log(newToken);
        // return newToken;
      }
    });
};

var getToken = function() {
   TokenItem.findOne({})
     .sort ({
       createTime: -1
     })
     .exec(function(err, newToken){
       var
     });


};

exports.validateToken = function(req, res) {

};
