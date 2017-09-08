"use strict";

require('../../models/categorySchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('Category');

/* GET category list */
router.get('/', function(req, res, next) {
  dataSchema.find({}, function(err, categories){
    if (err) {
        next(err);
        return;
    }    
    res.json({success: true, categories: categories});
  });
});  

module.exports = router;
