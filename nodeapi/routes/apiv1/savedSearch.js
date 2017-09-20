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

// enable jwt authentication
var jwtAut = require('../../lib/jwtAuth');
router.use(jwtAut());

/* GET savedSearch list
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
});*/

/**
 * @api {get} /apiv1/savedSearch Get saved searches
 * @apiName /apiv1/savedSearch
 * @apiGroup SavedSearch
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} [user] Id user.
 * @apiParam {String} [category] Id category.
 * @apiParam {String} [keywords] Keywords to search.
 * @apiParam {String} [start] Number start records.
 * @apiParam {String} [limit] Number limit records.
 * @apiParam {String} [sort] Name of parameter to sort.
 *
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} savedSearches Saved search list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "savedSearches": [
 *              {
 *                  "_id": "",
 *                  "user": "",
 *                  "category": "",
 *                  "keywords": "",
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
    
    var user = req.query.user;
    var category = req.query.category;
    var keywords = req.query.keywords;
        
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || 0;
    var sort = req.query.sort || null;
    
    var filter = {};
    
    if (typeof user !== 'undefined') {
        filter.user = user;
    }
    
    if (typeof category !== 'undefined') {
        filter.category = category;
    }
    
    if (typeof keywords !== 'undefined') {
        filter.keywords = new RegExp('^' + keywords, "i");
    }
    
    // call with promise
    dataSchema.list(filter, start, limit, sort).then(function (dataFind) {
        if (dataFind.length > 0) {
            res.json({
                success: true,
                savedSearches: dataFind
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
 * @api {get} /apiv1/savedSearch/:id Get saved search by id
 * @apiName /apiv1/savedSearch/:id
 * @apiGroup SavedSearch
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} id SavedSearch id.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} savedSearch Saved search list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         success: true,
 *         savedSearch: {
 *             "_id": "",
 *             "user": "",
 *             "category": "",
 *             "keywords": "",
 *             "__v": 0             
 *         }   
 *     }
 *
 * @apiError {String}   message     message error.
 * @apiError {String}   id          id savedSearch.
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

/**
 * @api {post} /apiv1/savedSearch Create saved search
 * @apiName PostSavedSearch
 * @apiGroup SavedSearch
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} user Id user.
 * @apiParam {String} category Id category.
 * @apiParam {String} keywords Keywords to search.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} newData Data of saved search generated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "newData": {
 *              "__v": "",
 *              "user": "",
 *              "category": "",
 *              "keywords": "",
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

/**
 * @api {delete} /apiv1/savedSearch/:savedSearch Delete saved search by id
 * @apiName /apiv1/savedSearch/:savedSearch
 * @apiGroup SavedSearch
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} savedSearch Saved search id.
 *
 * @apiSuccess {String} message message.
 * @apiSuccess {String} id id saved search.
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
 * @apiError {String}   id          id saved search.
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

/**
 * @api {put} /apiv1/savedSearch/:idUpdate Update saved search by id
 * @apiName  /apiv1/savedSearch/:idUpdate
 * @apiGroup SavedSearch
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} idUpdate Saved search id.
 *
 * @apiParam {String} user Id user.
 * @apiParam {String} category Id category.
 * @apiParam {String} keywords Keywords to search.
 *
 * @apiSuccess {String} message message.
 * @apiSuccess {String} id id saved search.
 * @apiSuccess {String} newData Data of saved search updated.
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
 *              "user": "",
 *              "category": "",
 *              "keywords": "",
 *              "_id": ""
 *          }
 *     }
 *
 * @apiError {String}   message     message error.
 * @apiError {String}   id          id transaction.
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