"use strict"

var savedSearchSchema = require('../models/savedSearchSchema');
var categorySchema = require('../models/categorySchema');
var userSchema = require('../models/userSchema');

var catList = [];
var userList = [];

categorySchema.find({}, function (err, categories) {
    if (err) {
        console.log('SavedSearch saved error: ', err.message);
        return;
    }
    
    if (categories.length > 0) {
        categories.forEach(function(cat) {
            //console.log('Cat: ', cat); 
            catList.push(cat);      
        });
        
        userSchema.find({}, function (err, users) {
            if (err) {
                console.log('SavedSearch saved error: ', err.message);
                return;
            }
            //console.log('List users: ', users);
            if (users.length > 0) {
                users.forEach(function(user) {
                    //console.log('User: ', user); 
                    userList.push(user);      
                });
                
                for (var i=0; i<1; i++) {
					// save saveSearch
					var saveSearch = new savedSearchSchema({
						user: userList[0],
						category: catList[0],
						keywords: 'keywords' + i
					});
					
					saveSearch.save(function (err, searchSaved) {
						if (err) {
							console.log('SavedSearch saved error: ', err.message);
							return;
						}
						console.log('SavedSearch saved', searchSaved);
					});
                }
            } else {
                console.log('SavedSearch saved error: ', 'Users not found');
            }
        });
    } else {
        console.log('SavedSearch saved error: ', 'Category not found');
    }
});
