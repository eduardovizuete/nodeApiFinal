"use strict"

var mongoose = require('mongoose');

var userSchema = require('../models/userSchema');

// drop user collection
var colUsers = mongoose.connection.collections[userSchema.collection.collectionName];

colUsers.drop(function (err) {
	if (err) {
		console.log('Error User drop collection:', err.message);
		return;
	}
	console.log('User drop collection');
});
