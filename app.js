/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    morgan = require('morgan'),
    routes = require('./routes/index'),
    api = require('./api/api.route'),
    // api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose');

var app = module.exports = express();

// DB Configuration
mongoose.connect('mongodb://localhost/webapp01-dev')

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 9000);

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
    app.use(errorHandler());
}

// production only
/*if (env === 'production') {
   // TODO
}*/

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
