"use strict";

var mongoose = require('mongoose');

// define user schema
var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    email: String,
    latitude: String,
    longitude: String
});

// create model
var User = mongoose.model('User', userSchema);

// make available in node application
module.exports = User