"use strict"

var mongoose = require('mongoose');

var productSchema = require('../models/productSchema');

// drop product collection
var colProducts = mongoose.connection.collections[productSchema.collection.collectionName];

colProducts.drop(function (err) {
	if (err) {
		console.log('Error: ', err);
		return;
	}
	console.log('Product drop collection');
});
