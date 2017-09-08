"use strict";

require('../../models/productSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('Product');

/* GET product list */
router.get('/', function (req, res, next) {
    dataSchema.find({}, function (err, products) {
        if (err) {
            next(err);
            return;
        }
        res.json({
            success: true,
            products: products
        });
    });
});

/* POST data */
router.post('/', function (req, res, next) {
    console.log('Body: ', req.body);

    // data from post request
    var newData = new dataSchema({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        seller: req.body.seller,
        published_date: req.body.publishedDate,
        state: req.body.state,
        price: req.body.price
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