"use strict";

var mongoose = require('mongoose');

// define user schema
var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    email: String,
    latitude: String,
    longitude: String
});

// filter, sort and paginated list
userSchema.statics.list = function (filter, start, limit, sort) {
    return new Promise(function (resolve, reject) {
        console.log('Filtros: ', filter);
        console.log('start: ', start);
        console.log('limit: ', limit);
        console.log('sort: ', sort);

        var query = User.find(filter);
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
var User = mongoose.model('User', userSchema);

// make available in node application
module.exports = User