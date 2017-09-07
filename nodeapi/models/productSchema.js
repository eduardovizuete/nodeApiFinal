"use strict";

var mongoose = require('mongoose');

// define user schema
var productSchema = mongoose.Schema({
    name: String,
	description: String,
    category: String,
    seller: String,
    published_date: Date,
    state: String,
    price: Number
});

// create model
var Product = mongoose.model('Product', productSchema);

// make available in node application
module.exports = Product