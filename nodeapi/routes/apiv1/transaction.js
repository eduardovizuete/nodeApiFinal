"use strict";

require('../../models/transactionSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('Transaction');

/* GET transaction list */
router.get('/', function (req, res, next) {
    dataSchema.find({}, function (err, transactions) {
        if (err) {
            next(err);
            return;
        }
        res.json({
            success: true,
            transactions: transactions
        });
    });
});

/* POST data */
router.post('/', function (req, res, next) {
    console.log('Body: ', req.body);

    // data from post request
    var newData = new dataSchema({
        product: req.body.product,
        seller: req.body.seller,
        buyer: req.body.buyer,
        date: req.body.date
    });

    // save data   
    newData.save(function (err, newDataSaved) {
        if (err) {
            next(err);
            return;
        }
        res.json({
            success: true,
            newData: newDataSaved
        });
    });
});

module.exports = router;