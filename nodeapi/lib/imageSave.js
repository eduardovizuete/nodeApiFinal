"use strict"

var imageSchema = require('../models/imageSchema');

// save image
var img = new imageSchema({
    product: 'nameprod1',
	azure_id: 'azureidprod1'
});

img.save(function (err, imgSaved) {
	if (err) {
		next(err);
		return;
	}
	console.log('Image saved', imgSaved);
});
