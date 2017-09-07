"use strict";

var mongoose = require('mongoose');

// define category schema
var categorySchema = mongoose.Schema({
	name: String
});

// create model
var Category = mongoose.model('Category', categorySchema);

// make available in node application
module.exports = Category
