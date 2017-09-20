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

/**
 * @api {get} /apiv1/image Get images
 * @apiName /apiv1/image
 * @apiGroup Image
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} images Image list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "images": [
 *              {
 *                  "_id": "",
 *                  product: "",
 *                  azure_id: "",
 *                  "__v": 0    
 *              }
 *          ]
 *     }
 *
 * @apiError {String}   success         false.
 * @apiError {String}   message         message error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": "false",
 *       "message": "Data not found"
 *     }
 */

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

/**
 * @api {get} /apiv1/image/:id Get image by id
 * @apiName /apiv1/image/:id
 * @apiGroup Image
 *
 *
 * @apiParam {String} id Image id.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} image Image list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         success: true,
 *         image: {
 *              "_id": "",
 *              product: "",
 *              azure_id: "",
 *              "__v": 0
 *          }   
 *     }
 *
 * @apiError {String}   message     message error.
 * @apiError {String}   id          id image.
 * @apiError {String}   success     false.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Data not found",
 *       "id": id,
 *       "success": false
 *     }
 */

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

/**
 * @api {post} /apiv1/image Create image
 * @apiName PostImage
 * @apiGroup Image
 *
 * @apiParam {String} product Product id.
 * @apiParam {String} azureId Azure id.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} newData Data of image generated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "newData": {
 *              "__v": "",
 *              product: "",
 *              azure_id: "",
 *              "_id": ""
 *          }
 *     }
 *
 * @apiError {String}   success         false.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": "false"
 *     }
 */

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

/**
 * @api {delete} /apiv1/image/:image Delete image by id
 * @apiName /apiv1/image/:image
 * @apiGroup Image
 *
 *
 * @apiParam {String} image Image id.
 *
 * @apiSuccess {String} message message.
 * @apiSuccess {String} id id image.
 * @apiSuccess {String} success true.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "message": "Successfully deleted",
 *          "id": "",
 *          "success": true
 *     }
 *
 * @apiError {String}   message     message error.
 * @apiError {String}   id          id image.
 * @apiError {String}   success     false.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "Data not found",
 *          "id": "",
 *          "success": false
 *     }
 */

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

/**
 * @api {put} /apiv1/image/:idUpdate Update image by id
 * @apiName /apiv1/image/:idUpdate
 * @apiGroup Image
 *
 * @apiParam {String} idUpdate Image id.
 * 
 * @apiParam {String} product Product id.
 * @apiParam {String} azureId Azure id.
 *
 * @apiSuccess {String} message message.
 * @apiSuccess {String} id id image.
 * @apiSuccess {String} newData Data of image updated.
 * @apiSuccess {String} success true.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "message": "Successfully updated",
 *          "id": "",
 *          "success": "true",
 *          "newData": {
 *              "__v": "",
 *              product: "",
 *              azure_id: "",
 *              "_id": ""
 *          }
 *     }
 *
 * @apiError {String}   message     message error.
 * @apiError {String}   id          id image.
 * @apiError {String}   success     false.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "Data not found",
 *          "id": "",
 *          "success": false
 *     }
 */

/* PUT data */
router.put('/:idUpdate', function (req, res, next) {
    console.log('Body: ', req.body);
    
    var idUpdate = req.params.idUpdate
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