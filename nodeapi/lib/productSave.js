"use strict"

var productSchema = require('../models/productSchema');

// save product
var prod = new productSchema({
    name: 'nameprod1',
	description:'descprod1',
    category: 'cat1',
    seller: 'username1',
    published_date: '07/09/2017',
    state: 'selling',
    price: 10.5
});

prod.save(function (err, prodSaved) {
	if (err) {
		next(err);
		return;
	}
	console.log('Product saved', prodSaved);
});
