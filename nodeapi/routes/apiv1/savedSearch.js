"use strict";

require('../../models/savedSearchSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('SavedSearch');

/* GET savedSearch list */
router.get('/', function (req, res, next) {
    dataSchema.find({}, function (err, savedSearches) {
        if (err) {
            next(err);
            return;
        }
        res.json({
            success: true,
            savedSearches: savedSearches
        });
    });
});

/* POST data */
router.post('/', function (req, res, next) {
    console.log('Body: ', req.body);

    // data from post request
    var newData = new dataSchema({
        user: req.body.user,
        category: req.body.category,
        keywords: req.body.keywords
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