/*
    Develop by: Eduardo Vizuete
*/

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

/* GET data by id */
router.get('/:id', function (req, res, next) {
    var id = req.params.id;    
    console.log('Find id: ', id);
    
    dataSchema.findById(id, function (err, dataFind) {
        if (err) {
            next(err);
            return;
        } else {
            if (dataFind != null) {
                res.json({
                    success: true,
                    savedSearch: dataFind
                });
            } else {
                res.json({
                    message: "Data not found",
                    id: id,
                    success: false
                });
                console.log("Data not found: " + id);
            }               
        }       
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

/* DELETE data */
router.delete('/:savedSearch', function (req, res, next) {
    var idDelete = req.params.savedSearch
    console.log('Delete id: ', idDelete);

    dataSchema.findByIdAndRemove({
            _id: idDelete
        }, function (err, dataDeleted) {
            if (err) {
                console.log(err);
                next(err);
                return;
            } else {
                if (dataDeleted != null) {
                    res.json({
                        message: "Successfully deleted",
                        id: dataDeleted._id,
                        success: true
                    });   
                    console.log("Successfully deleted: " + idDelete);
                } else {
                    res.json({
                        message: "Data not found",
                        id: idDelete,
                        success: false
                    });
                    console.log("Data not found: " + idDelete);
                }               
            }
        }
    );
});

/* PUT data */
router.put('/:id', function (req, res, next) {
    console.log('Body: ', req.body);
    
    var idUpdate = req.params.id
    console.log('Update id: ', idUpdate);

    // data from post request
    var newData = new dataSchema({
        user: req.body.user,
        category: req.body.category,
        keywords: req.body.keywords
    });

    dataSchema.findByIdAndUpdate(
        idUpdate, 
        {   $set:
            {
                user: newData.user,
                category: newData.category,
                keywords: newData.keywords
            }
        }, 
        function (err, dataUpdated) {
            if (err) {
                console.log(err);
                next(err);
                return;
            } else {
                if (dataUpdated != null) {
                    res.json({
                        message: "Successfully updated",
                        id: idUpdate,
                        newData: newData,
                        success: true
                    });   
                    console.log("Successfully updated: " + idUpdate);
                } else {
                    res.json({
                        message: "Data not found",
                        id: idUpdate,
                        success: false
                    });
                    console.log("Data not found: " + idUpdate);
                }               
            }
        }
    );
});

module.exports = router;