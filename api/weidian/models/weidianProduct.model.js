<<<<<<< HEAD
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weidianProductSchema = new Schema({
  price: String,  //true
  stock: String,  //true
  free_delivery: String, //true 0=excl. express, 1=incl. express
  bigimgs: [{
    type: String //true product picture
  }],
  titles: [{
    type: String, //true picture description
  }],
  remote_free_delivery: String, //true remote delivery 0=incl. express 1=excl. express
  sku: [{
    stock: Number, //false
    price: String, //false
    title: String //false sku name
  }],
  cate_id: String, //true catagory, use "," to separate
  itemName: String, //true description
  createTime: {
    type: Date,
    'default': Date.now
  }
});

module.exports = mongoose.model('Token', TokenSchema);
=======
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weidianProductSchema = new Schema({
  price: String,  //true
  stock: String,  //true
  free_delivery: String, //true 0=excl. express, 1=incl. express
  bigimgs: [{
    type: String //true product picture
  }],
  titles: [{
    type: String, //true picture description
  }],
  remote_free_delivery: String, //true remote delivery 0=incl. express 1=excl. express
  sku: [{
    stock: Number, //false
    price: String, //false
    title: String //false sku name
  }],
  cate_id: String, //true catagory, use "," to separate
  itemName: String, //true description
  scrapeItem_id: {
    type: Schema.Types.ObjectId,
    ref: 'scrapeItem'
  },
  createTime: {
    type: Date,
    'default': Date.now
  }
});

module.exports = mongoose.model('weidianProduct', weidianProductSchema);
>>>>>>> b48fa4b1622ffb04fb63cddea85b21ba4c82b15d
