// modules =================================================
var express            = require('express');
var app                = express();
var morgan             = require('morgan')
var mongoose           = require('mongoose');
var bodyParser         = require('body-parser');
var methodOverride     = require('method-override');

// configuration ===========================================

var routes         = require('./api/routes');

var port = process.env.PORT || 2000;

//mongoose.connect(process.env.db_url || 'ttbarnes:j3zuNAWkwLMz@ds049641.mongolab.com:49641/mean-example-db');

mongoose.connect('ttbarnes:j3zuNAWkwLMz@ds035633.mongolab.com:35633/mean-tweets-test');


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

// @ifdef DEVELOPMENT
app.use(express.static(__dirname + '/public/src')); //set the static files location
// @endif

// @ifdef PRODUCTION
app.use(express.static(__dirname + '/public/src/dist')); //set the static files location
// @endif


//enable server logging
app.use(morgan('dev'));

// register api routes
// all of our routes will be prefixed with /api
app.use('/api', routes);

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Server running on port ' + port);
exports = module.exports = app;  // expose app