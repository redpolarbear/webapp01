'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weidianTokenSchema = new Schema({
  access_token: String,
  expire_in: Number,
  createTime: {
    type: Date,
    'default': Date.now
  }
});

module.exports = mongoose.model('weidianToken', weidianTokenSchema);
