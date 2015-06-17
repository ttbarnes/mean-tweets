// modules =================================================
var express        = require('express');
var app            = express();
var morgan         = require('morgan')
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================

// config files
var db = require('./config/db');

var Tweet = require('./app/models/tweet');

var port = process.env.PORT || 2000; // set our port
mongoose.connect(db.url); // connect to our mongoDB database

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public/src')); // set the static files location

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening to the api');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'welcome to the api' });
});

router.get('/search', function(req, res) {
    res.json({ message: 'welcome to the search api' });
});

router.route('/search/:searchstring')

  //search tweets
  .get(function(req, res) {

    Tweet.find({name: new RegExp(req.params.searchstring, "i")}, function(err, tweets) {
      if (err)
            res.send(err);
        res.json(tweets);
    });

  });

router.route('/tweets')
  // create a tweet
  .post(function(req, res) {
      
      var tweet = new Tweet();      //create a new instance of the Tweet model
      tweet.name = req.body.name;  //set the tweets name (comes from the request)
      tweet.username = req.body.username;  //set the tweets username (comes from the request)
      tweet.timestamp = new Date().toISOString(); //create a new date

      // save the tweet and check for errors
      tweet.save(function(err) {
          if (err)
              res.send(err);

          res.json({ message: 'Tweet created!' });
      });
      
  })

   // get all the tweets
  .get(function(req, res) {
      Tweet.find(function(err, tweets) {
          if (err)
              res.send(err);

          res.json(tweets);
      });
  });


router.route('/tweets/:username')

  // get tweets with that user id
  .get(function(req, res) {
    Tweet.find({ username: req.params.username }).find(function(err, userTweets) {
      if (err)
            res.send(err);
        res.json(userTweets);
    });

  });


router.route('/tweets/:tweet_id')

  // get the tweet with that tweet id
  .get(function(req, res) {
      Tweet.findById(req.params.tweet_id, function(err, tweet) {
          if (err)
              res.send(err);
          res.json(tweet);
      });
  })

   // update the tweet with that tweet id
  .put(function(req, res) {

      // use our tweet model to find the tweet we want
      Tweet.findById(req.params.tweet_id, function(err, tweet) {

          if (err)
              res.send(err);

          tweet.name = req.body.name;  // update the tweets info

          // save the tweet
          tweet.save(function(err) {
              if (err)
                  res.send(err);

              res.json({ message: 'Tweet updated!' });
          });

      });
  })

   // delete the tweet with that tweet id
  .delete(function(req, res) {
      Tweet.remove({
          _id: req.params.tweet_id
      }, function(err, tweet) {
          if (err)
              res.send(err);

          res.json({ message: 'Successfully deleted' });
      });
  });


//enable server logging
app.use(morgan('combined'));


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Server running on port ' + port);
exports = module.exports = app;  // expose app