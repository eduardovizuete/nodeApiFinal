/*
    Develop by: Eduardo Vizuete
*/

"use strict";

require('../../models/categorySchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('Category');

/**
 * @api {get} /apiv1/category Get categories
 * @apiName /apiv1/category
 * @apiGroup Category
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} categories Category list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "categories": [
 *              {
 *                  "_id": "",
 *                  "name": "",
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

/**
 * @api {get} /apiv1/category/:id Get category by id
 * @apiName /apiv1/category/:id
 * @apiGroup Category
 *
 *
 * @apiParam {String} id Category id.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} category Category list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         success: true,
 *         category: {
 *              "_id": "",
 *              "name": "",
 *              "__v": 0
 *         }   
 *     }
 *
 * @apiError {String}   message     message error.
 * @apiError {String}   id          id category.
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
                    category: dataFind
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
 * @api {post} /apiv1/category Create category
 * @apiName PostCategory
 * @apiGroup Category
 *
 * @apiParam {String} name Category name.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} newData Data of category generated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "newData": {
 *              "__v": "",
 *              "name": "",
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

/**
 * @api {delete} /apiv1/category/:category Delete category by id
 * @apiName /apiv1/category/:category
 * @apiGroup Category
 *
 *
 * @apiParam {String} category Category id.
 *
 * @apiSuccess {String} message message.
 * @apiSuccess {String} id id category.
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
 * @apiError {String}   id          id category.
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
router.delete('/:category', function (req, res, next) {
    var idDelete = req.params.category
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
 * @api {put} /apiv1/category/:idUpdate Update category by id
 * @apiName /apiv1/category/:idUpdate
 * @apiGroup Category
 *
 * @apiParam {String} idUpdate Category id.
 *
 * @apiParam {String} name Category name.
 *
 * @apiSuccess {String} message message.
 * @apiSuccess {String} id id category.
 * @apiSuccess {String} newData Data of category updated.
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
 *              "name": "",
 *              "_id": ""
 *          }
 *     }
 *
 * @apiError {String}   message     message error.
 * @apiError {String}   id          id category.
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
        name: req.body.name
    });
    
    dataSchema.findByIdAndUpdate(
        idUpdate, 
        {   $set:
            {
                name: newData.name,
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