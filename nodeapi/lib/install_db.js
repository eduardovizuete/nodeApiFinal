"use strict";

var sleep = require('system-sleep');

// mongoose connection
require('./mongoConnection'); 

console.log('Load data ...');

// test model drop category & test model save category
console.log('-> drop category');
require('./categoryDrop');
sleep(2000);
console.log('-> save category');
require('./categorySave');
sleep(3000);

// test model drop user & test model save user
console.log('-> drop user');
require('./userDrop');
sleep(2000);
console.log('-> save user');
require('./userSave');
sleep(3000);

// test model drop product & test model save product
console.log('-> drop product');
require('./productDrop');
sleep(2000);
console.log('-> save product');
require('./productSave');
sleep(3000);

// test model drop transaction & test model save transaction
console.log('-> drop transaction');
require('./transactionDrop');
sleep(2000);
console.log('-> save transaction');
require('./transactionSave');
sleep(3000);

// test model drop savedSearch & test model save savedSearch
console.log('-> drop savedSearch');
require('./savedSearchDrop');
sleep(2000);
console.log('-> save savedSearch');
require('./savedSearchSave');
sleep(3000);

// test model drop image & test model save image
console.log('-> drop image');
require('./imageDrop');
sleep(2000);
console.log('-> save image');
require('./imageSave');
sleep(3000);

console.log('Finished load data ...');
