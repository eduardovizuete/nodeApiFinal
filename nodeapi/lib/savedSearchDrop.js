"use strict"

var mongoose = require('mongoose');

var savedSearchSchema = require('../models/savedSearchSchema');

// drop savedSearch collection
var colSavedSearch = mongoose.connection.collections[savedSearchSchema.collection.collectionName];

colSavedSearch.drop(function (err) {
	if (err) {
		console.log('Error SavedSearch drop collection: ', err);
		return;
	}
	console.log('SavedSearch drop collection');
});
