"use strict";

require('../../models/productSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('Product');

/* GET product list */
router.get('/', function(req, res, next) {
  dataSchema.find({}, function(err, products){
    if (err) {
        next(err);
        return;
    }    
    res.json({success: true, products: products});
  });
});  

module.exports = router;