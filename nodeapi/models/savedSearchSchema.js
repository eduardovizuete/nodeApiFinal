"use strict";

var mongoose = require('mongoose');

// define savedSearch schema
var savedSearchSchema = mongoose.Schema({
    user: String,
	category: String,
    keywords: String
});

// create model
var SavedSearch = mongoose.model('SavedSearch', savedSearchSchema);

// make available in node application
module.exports = SavedSearch