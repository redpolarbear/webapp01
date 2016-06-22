'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weidianUploadImgSchema = new Schema({
  weidianImgURLs: [{
    type: String
  }],
  scrapeItem_id: {
    type: Schema.Types.ObjectId,
    ref: 'scrapeItem'
  },
  createTime: {
    type: Date,
    'default': Date.now
  }
});

module.exports = mongoose.model('weidianUploadImg', weidianUploadImgSchema);
