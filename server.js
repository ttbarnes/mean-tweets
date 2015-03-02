// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================

// config files
var db = require('./config/db');

var Bear = require('./app/models/bear');

var port = process.env.PORT || 2000; // set our port
mongoose.connect(db.url); // connect to our mongoDB database

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'welcome to the api' });   
});

router.route('/bears')
  // create a bear
  .post(function(req, res) {
      
      var bear = new Bear();      // create a new instance of the Bear model
      bear.name = req.body.name;  // set the bears name (comes from the request)

      // save the bear and check for errors
      bear.save(function(err) {
          if (err)
              res.send(err);

          res.json({ message: 'Bear created!' });
      });
      
  })

   // get all the bears
  .get(function(req, res) {
      Bear.find(function(err, bears) {
          if (err)
              res.send(err);

          res.json(bears);
      });
  });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Server running on port ' + port);
exports = module.exports = app;  // expose app