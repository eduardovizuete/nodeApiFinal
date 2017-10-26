"use strict"

var mongoose = require('mongoose');

var transactionSchema = require('../models/transactionSchema');

// drop transaction collection
var colTransactions = mongoose.connection.collections[transactionSchema.collection.collectionName];

colTransactions.drop(function (err) {
	if (err) {
		console.log('Error Transaction drop collection:', err.message);
		return;
	}
	console.log('Transaction drop collection');
});
