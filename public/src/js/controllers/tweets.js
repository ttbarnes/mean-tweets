//this is used for timeline and public profile

angular.module('meanTweetsApp').controller('TweetsCtrl', function (currentUserFactory, $state, $stateParams, $scope, Restangular, tweetsFactory, userProfileFactory) {

  $scope.profileUsername = $stateParams.username;    //public profile username from $stateParams

  if(currentUserFactory && currentUserFactory.username) {
    $scope.loggedInUser = currentUserFactory.username;
  }

  //apiRoute object only used for favouriteTweet
  //todo: cleanup/re-use more - DRY
  this.apiRoute = {
    tweets   : 'api/tweets/',
    profiles : 'api/profiles/'
  }
  var apiRoute = this.apiRoute;


  //todo: somehow merge these two functions into one:
  //alreadyFavouritedCheck
  //alreadyRetweetedCheck

  function alreadyFavouritedCheck(theTweets) {
    //for each tweet, check to see if any of the username fields (in favourites array)
    //equal $scope.loggedInUser.
    //if a match is found in one tweet,
    //add an extra field to the tweet: alreadyFavourited
    angular.forEach(theTweets, function (tweet) {
      if(tweet.favourites) {
        angular.forEach(tweet.favourites, function (favourites) {

          if(favourites.username === $scope.loggedInUser) {
            tweet.alreadyFavourited = true;
            tweet.usersFavId = favourites._id;
          }

        });
      }
    });
  };

  function alreadyRetweetedCheck(theTweets) {
    //for each tweet, check to see if any of the username fields (in retweets array)
    //equal $scope.loggedInUser.
    //if a match is found in one tweet,
    //add an extra field to the tweet: alreadyRetweeted
    angular.forEach(theTweets, function (tweet) {
      if(tweet.retweets) {
        angular.forEach(tweet.retweets, function (retweets) {

          if(retweets.username === $scope.loggedInUser) {
            tweet.loggedinUserRetweeted = true;
            tweet.usersFavId = retweets._id;
          }

        });
      }
    });
  };

  //if not public profile, it's timeline.
  if($state.current.controller === 'ProfilePublicCtrl') {
    this.apiEndpoint = tweetsFactory.userSpecificTweets($scope.profileUsername);
    var statePublicProfile = true;
  }
  else {
    this.apiEndpoint = userProfileFactory.user(currentUserFactory.username);
  }

  var endPoint = this.apiEndpoint;

  $scope.getTweets = function() {

    endPoint.getList().then(function (data) {
      console.info('got new tweets (p/profile\'s or currentUser\'s). the route: ' + endPoint.route);

      $scope.tweets = data;

      //at this point, public profile only needs to check favourite tweets, retweets and return the data.
      if(statePublicProfile) {
        alreadyFavouritedCheck(data);
        alreadyRetweetedCheck(data);
      }

      //timeline is more complex:
      //get the currentUsers's following username's, push to array (include currentUser username)
      //get only these users's tweets, return data
      //check for favourites, return data
      
      else {

        var userFollowing = [];
        currentUser = data; //user's following usernames

        if (currentUser[0].following && currentUser[0].following.length) {
          angular.forEach(currentUser[0].following, function (user) {
            userFollowing.push(user.username);
          });
        }

        //push current username to array so they appear in timeline too 
        //it doesn't matter if this user hasn't tweeted yet.
        userFollowing.push(currentUserFactory.username);

        //create object for restangular
        var currentUserFollowing = {
          userFollowing
        };

        //query the api - get only these users's tweets
        tweetsFactory.timeline(currentUserFollowing).then(function (tweets) {
          console.info('got new tweets (user following tweets): ' + currentUserFollowing.userFollowing.length + ' users');
          $scope.tweets = tweets;
          if(tweets.length) {
            alreadyFavouritedCheck(tweets);

            //remove currentUser from userFollowing for iterating retweets
            //right now we don't want to display a currentUsers's *own retweets* in the timeline.
            currentUserFollowing.userFollowing.pop();

            //for each tweet, check if any of the retweet usernames
            //equal a username in the current user's following array.
            //if a match is found, push the username to a new array
            //then we can display a list of retweets by users that I follow only.
            //eg: 'retweeted by X Y and Z'
            angular.forEach(tweets, function (tweet) {
            if(tweet.retweets) {

              tweet.followingAndRetweeted = [];

              angular.forEach(tweet.retweets, function (retweet) {
                if(currentUserFollowing.userFollowing.indexOf(retweet.username) > -1) {
                  tweet.followingRetweeted = true;
                  tweet.followingAndRetweeted.push({username:retweet.username});
                  tweet.retweetedUsernames = tweet.followingAndRetweeted;
                }
              });
            }
          });

          } else {
            $scope.userNoFollowings = true;
          }

        }, function (err) {
          console.warn('oh no, something went wrong with the nested api call for timeline tweets! details: \n', err);
        });

      }
      
      

      }, function (err) {
        console.warn('oh no, something went wrong with top/parent level api call! details: \n', err);
        $scope.userNotTweeted = true;
      });

  };

  $scope.getTweets();

  $scope.$on('refreshTweets', function () {
    console.info('refreshTweets called - getting new tweets');
    $scope.getTweets();
  });

  $scope.favouriteTweet = function(tweetId) {
    if(currentUserFactory.isAuth) {

      var urls = {
        usernameTweetFavs  : apiRoute.tweets + tweetId + '/favourites',
        tweetIdProfileFavs : apiRoute.profiles + currentUserFactory.username + '/tweets/favourites/' + tweetId
      }

      var newFavourite = {
        username: $scope.loggedInUser
      }

      //PUT the newFavourite username into the tweet's favourite array
      Restangular.all(urls.usernameTweetFavs).customPUT(newFavourite).then(function () {
        console.log('posted new favourite to: ' + urls.usernameTweetFavs);
      });

      //PUT tweet id in loggedInUser's profile favourites object
      Restangular.all(urls.tweetIdProfileFavs).customPUT(newFavourite).then(function () {
        console.log('posted new favourite tweet id to: ' + 'api/profiles/' + $scope.loggedInUser + '/tweets/favourites/' + tweetId);
      });

    }
  };

  $scope.unFavouriteTweet = function(tweetId, favouriteId) {
    if(currentUserFactory.isAuth) {

      var urls = {
        usernameTweetFavId : apiRoute.tweets + tweetId + '/favourites/' + favouriteId,
        tweetIdProfileFav  : apiRoute.profiles + currentUserFactory.username + '/tweets/favourites/' + tweetId
      }

      //REMOVE the username's fav ID from the tweet's favourite array
      Restangular.all(urls.usernameTweetFavId).remove().then(function () {
        console.log('removed user from favourites: ' + urls.usernameTweetFavId);
      });

      //REMOVE the tweet ID from the user's profile favourites array
      Restangular.all(urls.tweetIdProfileFav).remove().then(function () {
        console.log('removed tweet from the users profile favourites: ' + 'api/profiles/' + $scope.loggedInUser + '/tweets/favourites/' + tweetId);
      });

    }
  };

  $scope.retweetTweet = function(tweetId) {
    if(currentUserFactory.isAuth) {

      var urls = {
        usernameTweetRetweets  : apiRoute.tweets + tweetId + '/retweets',
        tweetIdProfileRetweets : apiRoute.profiles + currentUserFactory.username + '/tweets/retweets/' + tweetId
      }

      var newRetweet = {
        username: $scope.loggedInUser
      }

      //PUT the newRetweet username into the tweet's retweets array
      Restangular.all(urls.usernameTweetRetweets).customPUT(newRetweet).then(function () {
        console.log('posted new retweet to: ' + urls.usernameTweetRetweets);
      });

      //PUT tweet id in loggedInUser's profile retweets object
      Restangular.all(urls.tweetIdProfileRetweets).customPUT(newRetweet).then(function () {
        console.log('posted new retweet id to: ' + 'api/profiles/' + currentUserFactory.username + '/tweets/retweets/' + tweetId);
      });

    }
  };


});
