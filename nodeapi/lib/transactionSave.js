"use strict"

var transactionSchema = require('../models/transactionSchema');

// save product
var tran = new transactionSchema({
    product: 'nameprod1',
	seller: 'username1',
    buyer: 'username2',
    date: '07/09/2017'
});

tran.save(function (err, tranSaved) {
	if (err) {
		next(err);
		return;
	}
	console.log('Transaction saved', tranSaved);
});
