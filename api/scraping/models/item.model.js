'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  url: String,
  title: String,
  partnumber: String,
  colors: [{
    type: String
  }],
  price: String,
  weight: String,
  dimension: String,
  description: String,
  detail_descs: [{
    type: String
  }],
  imageURLs: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  imageLocalURLs:[{
    type: String
  }],
  createTime: {
    type: Date,
    'default': Date.now
  }
});

module.exports = mongoose.model('scrapeItem', ItemSchema);
