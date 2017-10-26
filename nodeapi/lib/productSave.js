"use strict"


var mongoose = require('mongoose');

var productSchema = require('../models/productSchema');
var categorySchema = require('../models/categorySchema');
var userSchema = require('../models/userSchema');

var catList = [];
var userList = [];

categorySchema.find({}, function (err, categories) {
    if (err) {
        console.log('Product saved error: ', err.message);
        return;
    }
    
    if (categories.length > 0) {
        categories.forEach(function(cat) {
            //console.log('Cat: ', cat); 
            catList.push(cat);      
        });
        
        userSchema.find({}, function (err, users) {
            if (err) {
                console.log('Users saved error: ', err.message);
                return;
            }
            //console.log('List users: ', users);
            if (users.length > 0) {
                users.forEach(function(user) {
                    //console.log('User: ', user); 
                    userList.push(user);      
                });
                
                for (var i=0; i<10; i++) {
                    // save product
                    var prod = new productSchema({
                        name: 'Name ' + i,
                        description:'Description ' + i,
                        category: catList[getRandomInt(0, catList.length)],
                        seller: userList[getRandomInt(0, userList.length)],
                        published_date: '07/09/2017',
                        state: 'selling',
                        price: i
                    });
                
                    prod.save(function (err, prodSaved) {
                        if (err) {
                            console.log('Product saved error: ', err.message);
                            return;
                        }
                        console.log('Product saved', prodSaved);
                    });
                }
            } else {
                console.log('Product saved error: ', 'Users not found');
            }
        });
    } else {
        console.log('Product saved error: ', 'Categories not found');
    }
});

// Retorna un entero aleatorio entre min (incluido) y max (excluido)
// ¡Usando Math.round() te dará una distribución no-uniforme!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}