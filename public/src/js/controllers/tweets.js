//this is used for timeline and public profile

angular.module('meanExampleApp').controller('TweetsCtrl', function (currentUserFactory, $state, $stateParams, $scope, Restangular, tweetsFactory, userProfileFactory) {
  
  $scope.profileUsername = $stateParams.username;    //public profile username from $stateParams

  //apiRoute object only used for favouriteTweet
  //todo: cleanup/re-use more - DRY
  var apiRoute = {
    tweets   : 'api/tweets/',
    profiles : 'api/profiles/'
  }

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


  function getTweets() {

    var apiEndpoint;

    //if not public profile, it's timeline.
    if($state.current.controller === 'ProfilePublicCtrl') {
      apiEndpoint = tweetsFactory.userSpecificTweets($scope.profileUsername);
      var statePublicProfile = true;
    }
    else {
      apiEndpoint = userProfileFactory.user(currentUserFactory.username);
    }

    apiEndpoint.getList().then(function (data) {

      $scope.tweets = data;

      //at this point, public profile only needs to check favourite tweets and return the data.
      if(statePublicProfile) {
        alreadyFavouritedCheck(data);
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
          console.info('got timeline tweets')
          $scope.tweets = tweets;
          if(tweets.length) {
            alreadyFavouritedCheck(tweets);
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

  getTweets();


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



});
