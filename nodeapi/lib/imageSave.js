"use strict"

var imageSchema = require('../models/imageSchema');
var productSchema = require('../models/productSchema');

var prodsList = [];

productSchema.find({}, function (err, products) {
    if (err) {
        console.log('Transaction saved error: ', err.message);
        return;
    }
    
    if (products.length > 0) {
        products.forEach(function(prod) {
            //console.log('Prod: ', prod); 
            prodsList.push(prod);      
        });
        
		for (var i=0; i<1; i++) {
			// save image
			var img = new imageSchema({
				product: prodsList[0],
				azure_id: 'azureid' + i
			});
			
			img.save(function (err, imgSaved) {
				if (err) {
					console.log('Image saved error: ', err.message);
					return;
				}
				console.log('Image saved', imgSaved);
			});
		}       
    } else {
        console.log('Image saved error: ', 'Products not found');
    }
});
