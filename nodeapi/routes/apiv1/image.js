"use strict";

require('../../models/imageSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('Image');

/* GET image list */
router.get('/', function(req, res, next) {
  dataSchema.find({}, function(err, images){
    if (err) {
        next(err);
        return;
    }    
    res.json({success: true, images: images});
  });
});  

module.exports = router;