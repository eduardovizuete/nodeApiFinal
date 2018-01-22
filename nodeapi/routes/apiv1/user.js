/*
    Develop by: Eduardo Vizuete
*/

"use strict";

require('../../models/userSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var createHash = require('sha.js');

// schema
var dataSchema = mongoose.model('User');

// enable jwt authentication
var jwtAut = require('../../lib/jwtAuth');
router.use(jwtAut()); 

/* GET data list
router.get('/', function (req, res, next) {
    dataSchema.find({}, function (err, users) {
        if (err) {
            next(err);
            return;
        }
        res.json({
            success: true,
            users: users
        });
    });
});*/

/**
 * @api {get} /apiv1/user Get users
 * @apiName /apiv1/user
 * @apiGroup User
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} [firstName] User first name.
 * @apiParam {String} [lastName] User last name .
 * @apiParam {String} [userName] User name.
 * @apiParam {String} [password] User password.
 * @apiParam {String} [email] User email.
 * @apiParam {String} [latitude] User latitude.
 * @apiParam {String} [longitude] User longitude. 
 * @apiParam {String} [start] Number start records.
 * @apiParam {String} [limit] Number limit records.
 * @apiParam {String} [sort] Name of parameter to sort.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} user User list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "users": [
 *              {
 *                  "_id": "",
 *                  "first_name": "",
 *                  "last_name": "",
 *                  "username": "",
 *                  "password": "",
 *                  "email": "",
 *                  "latitude": "",
 *                  "longitude": "",
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
    
    var firstName = req.query.firstName;
    var lastName = req.query.lastName;
    var username = req.query.userName;
    var password = req.query.password;
    var email = req.query.email;
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || 0;
    var sort = req.query.sort || null;
    
    var filter = {};
    
    if (typeof firstName !== 'undefined') {
        filter.first_name = new RegExp('^' + firstName, "i");
    }
    
    if (typeof lastName !== 'undefined') {
        filter.last_name = new RegExp('^' + lastName, "i");
    }
    
    if (typeof username !== 'undefined') {
        filter.username = username;
    }
    
    if (typeof email !== 'undefined') {
        filter.email = email;
    }
    
    // call with promise
    dataSchema.list(filter, start, limit, sort).then(function (dataFind) {
        if (dataFind.length > 0) {
            res.json({
                success: true,
                users: dataFind
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
 * @api {get} /apiv1/user/:id Get user by id
 * @apiName /apiv1/user/:id
 * @apiGroup User
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} id User id.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} user User list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "users": {
 *                  "_id": "",
 *                  "first_name": "",
 *                  "last_name": "",
 *                  "username": "",
 *                  "password": "",
 *                  "email": "",
 *                  "latitude": "",
 *                  "longitude": "",
 *                  "__v": 0               
 *          }
 *     }
 *
 * @apiError {String}   message     message error.
 * @apiError {String}   id          id user.
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
                    user: dataFind
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
 * @api {post} /apiv1/user Create user
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} firstName User first name.
 * @apiParam {String} lastName User last name .
 * @apiParam {String} userName User name.
 * @apiParam {String} password User password.
 * @apiParam {String} email User email.
 * @apiParam {String} [latitude] User latitude.
 * @apiParam {String} [longitude] User longitude. 
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} newData Data of user generated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": "true",
 *          "newData": {
 *              "__v": "",
 *              "first_name": "",
 *              "last_name": "",
 *              "username": "",
 *              "password": "",
 *              "email": "",
 *              "latitude": "",
 *              "longitude": "",
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
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });
    
    // encriptar clave
    var sha256 = createHash('sha256');
    var encrip = sha256.update(newData.password, 'utf8').digest('hex');
    newData.password = encrip;
    console.log('Clave encriptada: ', newData.password);

    // save data   
    newData.save(function (err, newDataSaved) {
        if (err) {
            next(err);
            return;
        }
        newDataSaved.password = '';
        res.json({
            success: true,
            newData: newDataSaved
        });
    });
});

/**
 * @api {delete} /apiv1/user/:user Delete user by id
 * @apiName /apiv1/user/:user
 * @apiGroup User
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} user User id.
 *
 * @apiSuccess {String} message message.
 * @apiSuccess {String} id id user.
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
 * @apiError {String}   id          id user.
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
router.delete('/:user', function (req, res, next) {
    var idDelete = req.params.user
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
 * @api {put} /apiv1/user/:idUpdate Update user by id
 * @apiName /apiv1/user/:idUpdate
 * @apiGroup User
 *
 * @apiHeader {String} x-access-token User unique access-key.
 *
 * @apiParam {String} idUpdate User id.
 * 
 * @apiParam {String} firstName User first name.
 * @apiParam {String} lastName User last name .
 * @apiParam {String} userName User name.
 * @apiParam {String} password User password.
 * @apiParam {String} email User email.
 * @apiParam {String} [latitude] User latitude.
 * @apiParam {String} [longitude] User longitude. 
 *
 * @apiSuccess {String} message message.
 * @apiSuccess {String} id id user.
 * @apiSuccess {String} newData Data of user updated.
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
 *              "first_name": "",
 *              "last_name": "",
 *              "username": "",
 *              "password": "",
 *              "email": "",
 *              "latitude": "",
 *              "longitude": "",
 *              "_id": ""
 *          }
 *     }
 *
 * @apiError {String}   message     message error.
 * @apiError {String}   id          id user.
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
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });
    
    // encriptar clave
    var sha256 = createHash('sha256');
    var encrip = sha256.update(newData.password, 'utf8').digest('hex');
    newData.password = encrip;
    console.log('Clave encriptada: ', newData.password);

    dataSchema.findByIdAndUpdate(
        idUpdate, 
        {   $set:
            {
                first_name: newData.first_name,
                last_name:  newData.last_name,
                username: newData.username,
                password: newData.password,
                email: newData.email,
                latitude: newData.latitude,
                longitude: newData.longitude
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