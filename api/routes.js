var express     = require('express');
var Tweet       = require('../app/models/tweet');
var Profile     = require('../app/models/profile');
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
  .get(function (req, res) {

    Tweet.find({name: new RegExp(req.params.searchstring, "i")}, function (err, tweets) {
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
  //create a tweet
  .post(function (req, res) {
    
    var tweet = new Tweet();  //create a new instance of the Tweet model
    tweet.username = req.body.username;  //set the tweets username (comes from the request)
    tweet.copy = req.body.copy;  //set the tweets name (comes from the request)
    tweet.image.url = req.body.image.url;
    tweet.timestamp = new Date().toISOString(); //create new date

    //save the tweet and check for errors
    tweet.save(function (err) {
      if (err)
        res.send(err);

      res.json({ message: 'Tweet created!' });
    });
  })

   //get all the tweets
  .get(function (req, res) {
    Tweet.find(function (err, tweets) {
      if (err)
        res.send(err);

      res.json(tweets)
    });
  });

router.route('/tweets/:tweet_id')

  //get the tweet with that tweet id
  .get(function (req, res) {
    Tweet.findById(req.params.tweet_id, function (err, tweet) {
      if (err)
        res.send(err);
      res.json(tweet);
    });
  })

   //update the tweet with that tweet id
  .put(function (req, res) {

    //use our tweet model to find the tweet we want
    Tweet.findById(req.params.tweet_id, function (err, tweet) {

      if (err)
        res.send(err);

      tweet.copy = req.body.copy;  //update the tweets info

      //save the tweet
      tweet.save(function (err) {
        if (err)
          res.send(err);

        res.json({ message: 'Tweet updated!' });
      });

    });
  })

   // delete the tweet with that tweet id
  .delete(function (req, res) {
    Tweet.remove({
      _id: req.params.tweet_id
    }, function (err, tweet) {
        if (err)
          res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
  });

router.route('/tweets/:tweet_id/favourites')

  .put(function (req, res) {

    tweetId        = req.params.tweet_id;
    userFavoriting = req.body.username;

    Tweet.findOneAndUpdate( {_id: tweetId }, { $push : {  favourites: { username: userFavoriting } } }, function (err, tweet) {
      if (err)
        res.send(err);
      res.json(tweet);
      console.log('User ' + userFavoriting + ' favourited ' + tweet.username +  '\'s tweet: \n' 
                          + tweetId + '\n' 
                          + 'tweet copy: ' + '\'' + tweet.copy + '\'');
    });


  });

router.route('/profiles')

  .get(function (req, res) {
    res.json({ message: 'public profile api' });
  });

  router.route('/profiles/:profile')
    .get(function (req, res) {

      Profile.find({username: new RegExp(req.params.profile, "i")}, function (err, profile) {
        if (err)
            res.send(err);
          if (!profile.length) {
            res.status(404).send('No-one found with the username \'' + req.params.profile + '\'');
          } else {
            res.json(profile);
          }
      });
    })

    .post(function (req, res) {
      Profile.find({username: new RegExp(req.params.profile, "i")}, function (err, profile) {
        if (!profile.length) {
          res.send('No-one found with the username \'' + req.params.profile + '\'');
          console.log('post new user');

          var profile = new Profile();
          profile.username = req.body.username;

          profile.save(function(err) {
            console.log('User added to db!');
            if (err)
              res.send(err);
          })
        }
      });
    });

  router.route('/profiles/:username/tweets')
    .get(function (req, res) {

      Tweet.find({username: new RegExp(req.params.username, "i")}, function (err, tweets) {
        if (err)
            res.send(err);
          if (!tweets.length) {
            res.status(500).send('No tweets found.');
          } else {
            res.json(tweets);
          }
      });
    });

  router.route('/profiles/:username/following')

    .put(function (req, res) {

      userFollowing = req.params.username;
      userToFollow  = req.body.userFollowing;

      Profile.findOneAndUpdate( {username: userFollowing},{ $push : {  following: { username: userToFollow } } }, function (err, profile) {
        if (err)
          res.send(err);
        res.json(profile);
        console.log('User ' + userFollowing + ' is now following ' + userToFollow);
      });

    });

  router.route('/profiles/:username/followers')

    .put(function (req, res) {

      userFollowers = req.params.username;
      userFollowing = req.body.userFollower;

      Profile.findOneAndUpdate( {username: userFollowers},{ $push : {  followers: { username: userFollowing } } }, function (err, profile) {
        if (err)
          res.send(err);
        res.json(profile);
        console.log('User ' + userFollowers + ' has a new follower: ' + userFollowing);
      });

    });


module.exports = router;
