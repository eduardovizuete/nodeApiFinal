"use strict"

var mongoose = require('mongoose');

var categorySchema = require('../models/categorySchema');

// drop category collection
var colCategories = mongoose.connection.collections[categorySchema.collection.collectionName];

colCategories.drop(function (err) {
	if (err) {
		console.log('Error Category drop collection: ', err.message);
		return;
	}
	console.log('Category drop collection');
});
