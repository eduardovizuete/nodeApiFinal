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