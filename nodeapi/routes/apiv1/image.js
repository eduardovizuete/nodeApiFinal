/*
    Develop by: Eduardo Vizuete
*/

"use strict";

require('../../models/imageSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('Image');

/* GET image list
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
});*/

/* GET data list by query parameters */
router.get('/', function (req, res, next) {
    var queryParams = req.query;
    console.log('Query params: ', queryParams);
    
    var product = req.query.product;
    var azure_id = req.query.azureId;
        
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || 0;
    var sort = req.query.sort || null;
    
    var filter = {};
    
    if (typeof product !== 'undefined') {
        filter.product = product;
    }
    
    if (typeof azure_id !== 'undefined') {
        filter.azure_id = new RegExp('^' + azure_id, "i");
    }
    
    // call with promise
    dataSchema.list(filter, start, limit, sort).then(function (dataFind) {
        if (dataFind.length > 0) {
            res.json({
                success: true,
                images: dataFind
            }); 
            console.log("Successfully query");
        } else {
            res.json({
                success: false,
                message: "Data not found"
            });
            console.log("Data not found");
        }       

    }).catch(function (err) {
        next("Error in query");
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
                    image: dataFind
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

/* DELETE data */
router.delete('/:image', function (req, res, next) {
    var idDelete = req.params.image
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
        product: req.body.product,
        azure_id: req.body.azureId
    });

    dataSchema.findByIdAndUpdate(
        idUpdate, 
        {   $set:
            {
                product: newData.product,
                azure_id: newData.azure_id
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