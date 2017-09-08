"use strict";

// mongoose connection
require('./mongoConnection'); 

// drop data

// test model drop category
require('./categoryDrop');

// test model drop user
require('./userDrop');

// test model drop user
require('./productDrop');

// test model drop transaction
require('./transactionDrop');

// test model drop transaction
require('./savedSearchDrop');

// test model drop transaction
require('./imageDrop');

// insert data

// test model save category
require('./categorySave');

// test model save user
require('./userSave');

// test model save product
require('./productSave');

// test model save transaction
require('./transactionSave');

// test model save savedSearch
require('./savedSearchSave');

// test model save image
require('./imageSave');
