"use strict";

var mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;

// define user schema
var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
	description: {
        type: String,
        required: true
    },
    category: {
        type: objectId,
        ref: 'Category',
        required: true,
        index: true
    },
    seller: {
        type: objectId,
        ref: 'User',
        required: true,
        index: true
    },
    published_date: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
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