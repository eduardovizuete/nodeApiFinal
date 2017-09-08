"use strict";

require('../../models/imageSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('Image');

/* GET image list */
router.get('/', function (req, res, next) {
    dataSchema.find({}, function (err, images) {
        if (err) {
            next(err);
            return;
        }
        res.json({
            success: true,
            images: images
        });
    });
});

/* POST data */
router.post('/', function (req, res, next) {
    console.log('Body: ', req.body);

    // data from post request
    var newData = new dataSchema({
        product: req.body.product,
        azure_id: req.body.azureId
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