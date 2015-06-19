var express     = require('express');
var Tweet       = require('../app/models/tweet');
var router      = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('something is happening to the api');
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
        if (!tweets.length) {
          res.status(500).send('No tweets found with your search criteria. Please try something else.');
        } else {
          res.json(tweets);
        }
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

module.exports = router;
