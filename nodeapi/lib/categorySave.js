"use strict"

var categorySchema = require('../models/categorySchema');

for (var i=0; i<10; i++) {
	// save category
	var cat = new categorySchema({
		name: 'Category ' + i
	});

	cat.save(function (err, catSaved) {
		if (err) {
			console.log('Category error: ', catSaved);
			next(err);
			return;
		}
		console.log('Category saved', catSaved);
	});
}
