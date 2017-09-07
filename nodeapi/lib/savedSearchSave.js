"use strict"

var savedSearchSchema = require('../models/savedSearchSchema');

// save product
var saveSearch = new savedSearchSchema({
    user: 'username1',
	category: 'cat1',
    keywords: 'keywords'
});

saveSearch.save(function (err, searchSaved) {
	if (err) {
		next(err);
		return;
	}
	console.log('SavedSearch saved', searchSaved);
});
