"use strict";

var mongoose = require('mongoose');

// define image schema
var imageSchema = mongoose.Schema({
    product: String,
    azure_id: String
});

// filter, sort and paginated list
imageSchema.statics.list = function (filter, start, limit, sort) {
    return new Promise(function (resolve, reject) {
        console.log('Filtros: ', filter);
        console.log('start: ', start);
        console.log('limit: ', limit);
        console.log('sort: ', sort);

        var query = Image.find(filter);
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
var Image = mongoose.model('Image', imageSchema);

// make available in node application
module.exports = Image