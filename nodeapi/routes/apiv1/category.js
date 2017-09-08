"use strict";

require('../../models/categorySchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('Category');

/* GET data list */
router.get('/', function (req, res, next) {
    dataSchema.find({}, function (err, categories) {
        if (err) {
            next(err);
            return;
        }
        res.json({
            success: true,
            categories: categories
        });
    });
});

/* POST data */
router.post('/', function (req, res, next) {
    console.log('Body: ', req.body);

    // data from post request
    var newData = new dataSchema({
        name: req.body.name
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