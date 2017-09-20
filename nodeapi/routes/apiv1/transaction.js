/*
    Develop by: Eduardo Vizuete
*/

"use strict";

require('../../models/transactionSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('Transaction');

// enable jwt authentication
var jwtAut = require('../../lib/jwtAuth');
router.use(jwtAut());

/* GET transaction list
router.get('/', function (req, res, next) {
    dataSchema.find({}, function (err, transactions) {
        if (err) {
            next(err);
            return;
        }
        res.json({
            success: true,
            transactions: transactions
        });
    });
});*/

/**
 * @api {get} /apiv1/transaction Get transactions
 * @apiName /apiv1/transaction
 * @apiGroup Transaction
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} [product] Id Product.
 * @apiParam {String} [seller] Id seller.
 * @apiParam {String} [buyer] Id buyer.
 * @apiParam {String} [start] Number start records.
 * @apiParam {String} [limit] Number limit records.
 * @apiParam {String} [sort] Name of parameter to sort.
 *
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} transactions Transaction list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "transactions": [
 *              {
 *                  "_id": "",
 *                  "product": "",
 *                  "seller": "",
 *                  "buyer": "",
 *                  "date": "date",
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
    var seller = req.query.seller;
    var buyer = req.query.buyer;
        
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || 0;
    var sort = req.query.sort || null;
    
    var filter = {};
    
    if (typeof product !== 'undefined') {
        filter.product = product;
    }
    
    if (typeof seller !== 'undefined') {
        filter.seller = seller;
    }
    
    if (typeof buyer !== 'undefined') {
        filter.buyer = buyer;
    }
    
    // call with promise
    dataSchema.list(filter, start, limit, sort).then(function (dataFind) {
        if (dataFind.length > 0) {
            res.json({
                success: true,
                transactions: dataFind
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
 * @api {get} /apiv1/transaction/:id Get transaction by id
 * @apiName /apiv1/transaction/:id
 * @apiGroup Transaction
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} id Transaction id.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} transaction Transaction list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         success: true,
 *         transaction: {
  *            "_id": "",
 *             "product": "",
 *             "seller": "",
 *             "buyer": "",
 *             "date": "date",
 *             "__v": 0             
 *         }   
 *     }
 *
 * @apiError {String}   message     message error.
 * @apiError {String}   id          id transaction.
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
                    transaction: dataFind
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
 * @api {post} /apiv1/transaction Create transaction
 * @apiName PostTransaction
 * @apiGroup Transaction
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} product Id Product.
 * @apiParam {String} seller Id seller.
 * @apiParam {String} buyer Id buyer.
 * @apiParam {Date} date Date transaction.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} newData Data of transaction generated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "newData": {
 *              "__v": "",
 *             "product": "",
 *             "seller": "",
 *             "buyer": "",
 *             "date": "date",
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
        seller: req.body.seller,
        buyer: req.body.buyer,
        date: req.body.date
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
 * @api {delete} /apiv1/transaction/:transaction Delete transaction by id
 * @apiName /apiv1/transaction/:transaction
 * @apiGroup Transaction
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} transaction Transaction id.
 *
 * @apiSuccess {String} message message.
 * @apiSuccess {String} id id transaction.
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

/* DELETE data */
router.delete('/:transaction', function (req, res, next) {
    var idDelete = req.params.transaction
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
 * @api {put} /apiv1/transaction/:idUpdate Update transaction by id
 * @apiName  /apiv1/transaction/:idUpdate
 * @apiGroup Transaction
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} idUpdate Transaction id.
 *
 * @apiParam {String} product Id Product.
 * @apiParam {String} seller Id seller.
 * @apiParam {String} buyer Id buyer.
 * @apiParam {Date} date Date transaction.
 *
 * @apiSuccess {String} message message.
 * @apiSuccess {String} id id transaction.
 * @apiSuccess {String} newData Data of transaction updated.
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
 *              "product": "",
 *              "seller": "",
 *              "buyer": "",
 *              "date": "date",
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
        product: req.body.product,
        seller: req.body.seller,
        buyer: req.body.buyer,
        date: req.body.date
    });

    dataSchema.findByIdAndUpdate(
        idUpdate, 
        {   $set:
            {
                product: newData.product,
                seller: newData.seller,
                buyer: newData.buyer,
                date: newData.date
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