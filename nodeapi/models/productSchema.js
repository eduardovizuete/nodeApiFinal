"use strict";

var mongoose = require('mongoose');

// define user schema
var productSchema = mongoose.Schema({
    name: String,
	description: String,
    category: String,
    seller: String,
    published_date: Date,
    state: String,
    price: Number
});

// filter, sort and paginated list
productSchema.statics.list = function (filter, start, limit, sort) {
    return new Promise(function (resolve, reject) {
        console.log('Filtros: ', filter);
        console.log('start: ', start);
        console.log('limit: ', limit);
        console.log('sort: ', sort);

        var query = Product.find(filter);
        query.skip(start);
        query.limit(limit);
        query.sort(sort);
        query.exec(function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

// create model
var Product = mongoose.model('Product', productSchema);

// make available in node application
module.exports = Product