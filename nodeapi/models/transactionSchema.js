"use strict";

var mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;

// define user schema
var transactionSchema = mongoose.Schema({
    product: {
        type: objectId,
        ref: 'Product',
        required: true,
        index: true
    },
    seller: {
        type: objectId,
        ref: 'User',
        required: true,
        index: true
    },
    buyer: {
        type: objectId,
        ref: 'User',
        required: true,
        index: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// filter, sort and paginated list
transactionSchema.statics.list = function (filter, start, limit, sort) {
    return new Promise(function (resolve, reject) {
        console.log('Filtros: ', filter);
        console.log('start: ', start);
        console.log('limit: ', limit);
        console.log('sort: ', sort);

        var query = Transaction.find(filter);
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
var Transaction = mongoose.model('Transaction', transactionSchema);

// make available in node application
module.exports = Transaction