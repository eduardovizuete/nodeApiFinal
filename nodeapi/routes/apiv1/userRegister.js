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

// middleware register user
/**
 * @api {post} /apiv1/userRegister Register user
 * @apiName /apiv1/userRegister
 * @apiGroup User
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

module.exports = router;