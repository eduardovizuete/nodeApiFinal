"use strict"

var userSchema = require('../models/userSchema');

// save user
var usr = new userSchema({
	first_name: 'first_name1',
	last_name: 'last_name1',
    username: 'username1',
    password: 'password1',
    email: 'email1',
    latitude: 'latitude1',
    longitude: 'longitude1' 
});

usr.save(function (err, usrSaved) {
	if (err) {
		next(err);
		return;
	}
	console.log('User saved', usrSaved);
});
