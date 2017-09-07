"use strict";

var mongoose = require('mongoose');

// define user schema
var transactionSchema = mongoose.Schema({
    product: String,
	seller: String,
    buyer: String,
    date: Date
});

// create model
var Transaction = mongoose.model('Transaction', transactionSchema);

// make available in node application
module.exports = Transaction