"use strict";

var mongoose = require('mongoose');

// define category schema
var categorySchema = mongoose.Schema({
	name: {
        type: String,
        required: true,
        index: true
    }
});

// filter, sort and paginated list
categorySchema.statics.list = function (filter, start, limit, sort) {
    return new Promise(function (resolve, reject) {
        console.log('Filtros: ', filter);
        console.log('start: ', start);
        console.log('limit: ', limit);
        console.log('sort: ', sort);

        var query = Category.find(filter);
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
var Category = mongoose.model('Category', categorySchema);

// make available in node application
module.exports = Category
