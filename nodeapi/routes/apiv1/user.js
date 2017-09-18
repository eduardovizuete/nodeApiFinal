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
        res.json({
            success: true,
            newData: newDataSaved
        });
    });
});

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

/* PUT data */
router.put('/:id', function (req, res, next) {
    console.log('Body: ', req.body);
    
    var idUpdate = req.params.id
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