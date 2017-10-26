"use strict"

var userSchema = require('../models/userSchema');

for (var i=0; i<10; i++) {
	// save user
	var usr = new userSchema({
		first_name: 'first_name' + i,
		last_name: 'last_name' + i,
		username: 'username' + i,
		password: 'password' + i,
		email: 'email' + i,
		latitude: 'latitude' + i,
		longitude: 'longitude' + i 
	});

	usr.save(function (err, usrSaved) {
		if (err) {
			console.log('User saved error: ', err.message);
			return;
		}
		console.log('User saved', usrSaved);
	});
}