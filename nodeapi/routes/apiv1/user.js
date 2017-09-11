/*
    Develop by: Eduardo Vizuete
*/

"use strict";

require('../../models/userSchema');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// schema
var dataSchema = mongoose.model('User');

/* GET data list */
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


module.exports = router;