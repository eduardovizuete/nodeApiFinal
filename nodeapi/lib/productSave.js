"use strict"

var productSchema = require('../models/productSchema');

for (var i=0; i<10; i++) {
    // save product
    var prod = new productSchema({
        name: 'Name ' + i,
        description:'Description ' + i,
        category: 'Category ' + i,
        seller: 'Seller username' + 1,
        published_date: '07/09/2017',
        state: 'selling',
        price: i
    });

    prod.save(function (err, prodSaved) {
        if (err) {
            console.log('Product error: ', prodSaved);
            next(err);
            return;
        }
        console.log('Product saved', prodSaved);
    });
}
