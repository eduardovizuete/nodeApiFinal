"use strict";

require('../../models/userSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('User');

/* GET user list */
router.get('/', function(req, res, next) {
  dataSchema.find({}, function(err, users){
    if (err) {
        next(err);
        return;
    }    
    res.json({success: true, users: users});
  });
});  

module.exports = router;