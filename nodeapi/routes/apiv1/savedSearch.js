"use strict";

require('../../models/savedSearchSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('SavedSearch');

/* GET savedSearch list */
router.get('/', function(req, res, next) {
  dataSchema.find({}, function(err, savedSearches){
    if (err) {
        next(err);
        return;
    }    
    res.json({success: true, savedSearches: savedSearches});
  });
});  

module.exports = router;