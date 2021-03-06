/*
    Develop by: Eduardo Vizuete
*/

var express = require('express');
var docserver = require('docserver');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

// mongoose connection
require('./lib/mongoConnection');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// publish documentation
app.use('/apidoc', express.static(path.join(__dirname, 'docs/apidoc')));
app.use('/dbdoc', express.static(path.join(__dirname, 'docs/db_doc/html_doc')));

//app.use('/', index);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// middleware login
app.use('/apiv1/login', require('./routes/apiv1/login')); 

// middleware register user
app.use('/apiv1/userRegister', require('./routes/apiv1/userRegister'));

// middleware category
app.use('/apiv1/category', require('./routes/apiv1/category'));

// middleware user
app.use('/apiv1/user', require('./routes/apiv1/user'));

// middleware product
app.use('/apiv1/product', require('./routes/apiv1/product'));

// middleware transaction
app.use('/apiv1/transaction', require('./routes/apiv1/transaction'));

// middleware savedSearch
app.use('/apiv1/savedSearch', require('./routes/apiv1/savedSearch'));

// middleware image
app.use('/apiv1/image', require('./routes/apiv1/image'));

app.use(docserver({ // Con este modulo servimos en raiz del API la documentación.
    dir: __dirname + '',  // serve Markdown files in the docs directory...
    url: '/'}                  // ...and serve them at the root of the site
));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;