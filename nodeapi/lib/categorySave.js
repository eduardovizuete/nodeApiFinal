"use strict"

var categorySchema = require('../models/categorySchema');

// save category
var cat = new categorySchema({
	name: 'cat1'
});

cat.save(function (err, catSaved) {
	if (err) {
		next(err);
		return;
	}
	console.log('Category saved', catSaved);
});
