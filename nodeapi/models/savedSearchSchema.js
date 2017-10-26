"use strict";

var mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;

// define savedSearch schema
var savedSearchSchema = mongoose.Schema({
    user: {
        type: objectId,
        ref: 'User',
        required: true,
        index: true
    },
	category: {
        type: objectId,
        ref: 'Category',
        required: true,
        index: true
    },
    keywords: {
        type: String,
        required: true
    }
});

// filter, sort and paginated list
savedSearchSchema.statics.list = function (filter, start, limit, sort) {
    return new Promise(function (resolve, reject) {
        console.log('Filtros: ', filter);
        console.log('start: ', start);
        console.log('limit: ', limit);
        console.log('sort: ', sort);

        var query = SavedSearch.find(filter);
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
var SavedSearch = mongoose.model('SavedSearch', savedSearchSchema);

// make available in node application
module.exports = SavedSearch