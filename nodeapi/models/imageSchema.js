"use strict";

var mongoose = require('mongoose');

// define image schema
var imageSchema = mongoose.Schema({
    product: String,
    azure_id: String
});

// create model
var Image = mongoose.model('Image', imageSchema);

// make available in node application
module.exports = Image