"use strict"

var transactionSchema = require('../models/transactionSchema');
var productSchema = require('../models/productSchema');
var userSchema = require('../models/userSchema');

var prodsList = [];
var userList = [];

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
        
        userSchema.find({}, function (err, users) {
            if (err) {
                console.log('Transaction saved error: ', err.message);
                return;
            }
            //console.log('List users: ', users);
            if (users.length > 0) {
                users.forEach(function(user) {
                    //console.log('User: ', user); 
                    userList.push(user);      
                });
                
                for (var i=0; i<1; i++) {
                    // save transaction
					var tran = new transactionSchema({
						product: prodsList[0],
						seller: prodsList[0].seller,
						buyer: userList[1],
						date: '07/09/2017'
					});
					
					tran.save(function (err, tranSaved) {
						if (err) {
							console.log('Transaction saved error: ', err.message);
							return;
						}
						console.log('Transaction saved', tranSaved);
					});
                }
            } else {
                console.log('Transaction saved error: ', 'Users not found');
            }
        });
    } else {
        console.log('Transaction saved error: ', 'Products not found');
    }
});