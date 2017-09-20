/*
    Develop by: Eduardo Vizuete
*/

"use strict";

require('../../models/productSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('Product');

/* GET product list
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
});*/

/**
 * @api {get} /apiv1/product Get products
 * @apiName /apiv1/product
 * @apiGroup Product
 *
 * @apiParam {String} [name] Product name.
 * @apiParam {String} [description] Product description.
 * @apiParam {String} [category] Category id.
 * @apiParam {String} [seller] Seller id.
 * @apiParam {String} [state] Product state.
 * @apiParam {String} [start] Number start records.
 * @apiParam {String} [limit] Number limit records.
 * @apiParam {String} [sort] Name of parameter to sort.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} products Product list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "products": [
 *              {
 *                  "_id": "",
 *                  "name": "",
 *                  "description": "",
 *                  "category": "",
 *                  "seller": "",
 *                  "published_date": "date",
 *                  "state": "",
 *                  "price": 0,
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
    
    var name = req.query.name;    
    var description = req.query.description;
    var category = req.query.category;
    var seller = req.query.seller;
    var state = req.query.state;
    
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || 0;
    var sort = req.query.sort || null;
    
    var filter = {};
    
    if (typeof name !== 'undefined') {
        filter.name = new RegExp('^' + name, "i");
    }
    
    if (typeof description !== 'undefined') {
        filter.description = new RegExp('^' + description, "i");
    }
    
    if (typeof category !== 'undefined') {
        filter.category = category;
    }
    
    if (typeof seller !== 'undefined') {
        filter.seller = seller;
    }
    
    if (typeof state !== 'undefined') {
        filter.state = state;
    }
    
    // call with promise
    dataSchema.list(filter, start, limit, sort).then(function (dataFind) {
        if (dataFind.length > 0) {
            res.json({
                success: true,
                products: dataFind
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
 * @api {get} /apiv1/product/:id Get product by id
 * @apiName /apiv1/product/:id
 * @apiGroup Product
 *
 *
 * @apiParam {String} id Product id.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} product Product list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "product": {
 *              "_id": "",
 *              "name": "",
 *              "description": "",
 *              "category": "",
 *              "seller": "",
 *              "published_date": "date",
 *              "state": "",
 *              "price": 0,
 *              "__v": 0      
 *          }
 *     }
 *
 * @apiError {String}   message     message error.
 * @apiError {String}   id          id product.
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
                    product: dataFind
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
 * @api {post} /apiv1/product Create product
 * @apiName PostProduct
 * @apiGroup Product
 *
 * @apiParam {String} name Product name.
 * @apiParam {String} description Product description.
 * @apiParam {String} category Category id.
 * @apiParam {String} seller Seller id.
 * @apiParam {Date}   publishedDate Product publish date.
 * @apiParam {String} state Product state.
 * @apiParam {Number} price Product price.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} newData Data of product generated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "newData": {
 *              "__v": "",
 *              "name": "",
 *              "description": "",
 *              "category": "",
 *              "seller": "",
 *              "published_date": "date",
 *              "state": "",
 *              "price": 0,
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

/**
 * @api {delete} /apiv1/product/:product Delete product by id
 * @apiName /apiv1/product/:product
 * @apiGroup Product
 *
 *
 * @apiParam {String} product Product id.
 *
 * @apiSuccess {String} message message.
 * @apiSuccess {String} id id product.
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
 * @apiError {String}   id          id product.
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
router.delete('/:product', function (req, res, next) {
    var idDelete = req.params.product
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
 * @api {put} /apiv1/product/:idUpdate Update product by id
 * @apiName /apiv1/product/:idUpdate
 * @apiGroup Product
 *
 * @apiParam {String} idUpdate Product id.
 *
 * @apiParam {String} name Product name.
 * @apiParam {String} description Product description.
 * @apiParam {String} category Category id.
 * @apiParam {String} seller Seller id.
 * @apiParam {Date}   publishedDate Product publish date.
 * @apiParam {String} state Product state.
 * @apiParam {Number} price Product price.
 *
 * @apiSuccess {String} message message.
 * @apiSuccess {String} id id product.
 * @apiSuccess {String} newData Data of product updated.
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
 *              "description": "",
 *              "category": "",
 *              "seller": "",
 *              "published_date": "date",
 *              "state": "",
 *              "price": 0,
 *              "_id": ""
 *          }
 *     }
 *
 * @apiError {String}   message     message error.
 * @apiError {String}   id          id product.
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
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        seller: req.body.seller,
        published_date: req.body.publishedDate,
        state: req.body.state,
        price: req.body.price
    });

    dataSchema.findByIdAndUpdate(
        idUpdate, 
        {   $set:
            {
                name: newData.name,
                description: newData.description,
                category: newData.category,
                seller: newData.seller,
                published_date: newData.published_date,
                state: newData.state,
                price: newData.price
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