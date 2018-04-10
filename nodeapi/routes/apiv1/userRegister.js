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

const MSGERROR = 'Registration error';
var HttpException = require('./exceptions/httpException');

const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

// middleware register user
/**
 * @api {post} /apiv1/userRegister Register user
 * @apiName /apiv1/userRegister
 * @apiGroup User
 *
 * @apiParam {String} firstName User first name.
 * @apiParam {String} lastName User last name .
 * @apiParam {String} username User name.
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
 * @apiError {String}   status          http status code.
 * @apiError {String}   name            name or description http status code.
 * @apiError {String}   message         error message.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 'Unprocessable Entity
 *     {
 *       "success": "false",
 *       "status": 422,
 *       "name": "Unprocessable Entity",
 *       "message": "Error message"
 *     }
 */

/* POST data */
router.post(
    "/",
    [
      // Validate field is not empty
      // Sanitize (trim and escape)
      body("first_name").exists().isLength({ min: 1 }).trim().escape(),
      body("last_name").exists().isLength({ min: 1 }).trim().escape(),
      body("username").exists().isLength({ min: 1 }).trim().escape(),
      body("password").exists().isLength({ min: 1 }).trim().escape(),
      body("email").exists().isLength({ min: 1 }).trim().escape()
    ],
    function(req, res, next) {
        console.log('Body: ', req.body);

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (errors.isEmpty()) {

            // data from post request
            var newData = new dataSchema({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
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
                    console.log(MSGERROR + ": " + err);
                    var exception = new HttpException(false, 422, '', MSGERROR);
                    return res.status(422).json(exception.getMessageJson());
                } else {
                    newDataSaved.password = '';
                    res.json({
                        success: true,
                        newData: newDataSaved
                    });
                    console.log("Registration successful");
                }
            });
        } else {
            console.log(MSGERROR + ": " + "Body values required");
            var exception = new HttpException(false, 400, "", MSGERROR);
            res.status(400).json(exception.getMessageJson());
        }
    }
);

module.exports = router;