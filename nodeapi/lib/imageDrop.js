"use strict"

var mongoose = require('mongoose');

var imageSchema = require('../models/imageSchema');

// drop savedSearch collection
var colImage = mongoose.connection.collections[imageSchema.collection.collectionName];

colImage.drop(function (err) {
	if (err) {
		console.log('Error: ', err);
		return;
	}
	console.log('Image drop collection');
});
