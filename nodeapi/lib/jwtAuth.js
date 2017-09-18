"use strict";

var jwt = require('jsonwebtoken');
//var configJWT =  require('../local_config').jwt;

module.exports = function () {
    return function (req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {
            // verifies secret and checks exp
            //jwt.verify(token, configJWT.secret, function (err, decoded) {
            jwt.verify(token, '1234abcd', function (err, decoded) {
                if (err) {
                    console.log('Failed to autenticated token.');
                    return res.json({
                        success: false,
                        error: {
                            code: 401,
                            message: 'Failed to autenticated token.'
                        }
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decode = decoded;
                    console.log('request decoded: ', decoded);
                    next();
                }
            });
        } else {
            // if there is no token return error
            console.log('No token provided.');
            return res.status(403).json({
                success: false,
                error: {
                    code: 403,
                    message: 'No token provided.'
                }
            });            
        }
    };
};
