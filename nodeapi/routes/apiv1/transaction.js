"use strict";

require('../../models/transactionSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('Transaction');

/* GET transaction list */
router.get('/', function(req, res, next) {
  dataSchema.find({}, function(err, transactions){
    if (err) {
        next(err);
        return;
    }    
    res.json({success: true, transactions: transactions});
  });
});  

module.exports = router;