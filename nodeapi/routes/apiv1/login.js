/*
    Develop by: Eduardo Vizuete
*/

"use strict";

require('../../models/userSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var createHash = require('sha.js');
var jwt = require('jsonwebtoken');

// schema
var dataSchema = mongoose.model('User');

// middleware authenticate user and return token generate
/**
 * @api {post} /apiv1/login Authenticate user and return token generate 
 * @apiName /apiv1/login
 * @apiGroup Login
 *
 * @apiParam {String} userName User name.
 * @apiParam {String} password User password.
 *
 * @apiSuccess {String} success     true.
 * @apiSuccess {String} token       Token generate.
 * @apiSuccess {String} id          Id user. 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success"  : "true",
 *       "token"    : "eyJhbGc...",
 *       "id"       : "1234..."
 *     }
 *
 * @apiError {String}   message     Data not found.
 * @apiError {String}   username    User name.
 * @apiError {String}   success     false. 
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "message": "Data not found",
 *          "username": "username",
 *          "success": false
 *      }
 */

/* POST data */
router.post('/', function (req, res, next) {
    console.log('Body: ', req.body);
    
    var username = req.body.userName;
    var password = req.body.password;
    
    // encriptar clave
    var sha256 = createHash('sha256');
    var encrip = sha256.update(password, 'utf8').digest('hex');
    password = encrip;
    console.log('Clave encriptada: ', password);

    // save data   
    dataSchema.findOne(
        {username: username, password: password},
        function (err, dataFind) {            
            if (err) {
                next(err);
                return;
            } else {
                if (dataFind != null) {
                    // generate token
                    let token = jwt.sign({id: username}, '1234abcd', {
                        expiresIn: '2 days'
                    });
                    
                    res.json({
                        success: true,
                        token: token,
                        id: dataFind._id
                    });
                    console.log("Successfully generate token");
                } else {
                    res.json({
                        message: "Data not found",
                        username: username,
                        success: false
                    });
                    console.log("Data not found: " + username);
                }               
            }  
        });
});

module.exports = router;