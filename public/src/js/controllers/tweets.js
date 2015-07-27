//this is used for timeline and public profile

angular.module('meanTweetsApp').controller('TweetsCtrl', function (currentUserFactory, $state, $stateParams, $scope, apiEndpointFactory) {

  if(currentUserFactory && currentUserFactory.username) {
    $scope.loggedInUser = currentUserFactory.username;
  }

  function currentUserTweetsCheck(tweets) {
    angular.forEach(tweets, function (tweet) {

      //check to see if any of the username fields (in favourites array) equal $scope.loggedInUser.
      //if a match is found, add an extra field to the tweet: alreadyFavourited
      if(tweet.favourites) {
        angular.forEach(tweet.favourites, function (favourites) {
          if(favourites.username === $scope.loggedInUser) {
            tweet.alreadyFavourited = true;
            tweet.usersFavId = favourites._id;
          }
        });
      }

      //check to see if any of the username fields (in retweets array) equal $scope.loggedInUser.
      //if a match is found, add an extra field to the tweet: alreadyRetweeted
      if(tweet.retweets) {
        angular.forEach(tweet.retweets, function (retweets) {
          if(retweets.username === $scope.loggedInUser) {
            tweet.loggedinUserRetweeted = true;
            tweet.usersRetweetId = retweets._id;
          }
        });
      }
    });
  }

  //if not public profile, it's timeline.
  if($state.current.controller === 'ProfilePublicCtrl') {
    this.apiEndpoint = apiEndpointFactory.userTweets($stateParams.username);
    $scope.statePublicProfile = true;
  }
  else {
    this.apiEndpoint = apiEndpointFactory.user(currentUserFactory.username);
  }

  var endPoint = this.apiEndpoint;

  /*
  $scope.getTweets = function() {

    endPoint.getList().then(function (data) {
      console.info('got new tweets (p/profile\'s or currentUser\'s). the route: ' + endPoint.route);

      $scope.tweets = data;

      //public profile only needs to check favourite tweets, retweets and return the data.
      if($scope.statePublicProfile) {
        currentUserTweetsCheck(data);
      }

      //timeline is more complex:
      //get the currentUsers's following username's, push to array (include currentUser username)
      //get only these users's tweets, return data
      //check for favourites and retweets, return data
      else {
        var userFollowing = [];
        currentUser = data; //user's following usernames

        if(currentUser[0].following && currentUser[0].following.length) {
          angular.forEach(currentUser[0].following, function (user) {
            userFollowing.push(user.username);
          });
        }

        //push current username to array so they appear in timeline too (it doesn't matter if this user hasn't tweeted yet).
        userFollowing.push(currentUserFactory.username);

        //create object for restangular/api
        var currentUserFollowing = {
          userFollowing : userFollowing
        };

        //query the api - get only these users's tweets
        apiEndpointFactory.timeline(currentUserFollowing).then(function (tweets) {
          console.info('got new tweets (user following tweets): ' + currentUserFollowing.userFollowing.length + ' users');
          $scope.tweets = tweets;
          if(tweets.length) {

            currentUserTweetsCheck(tweets);

            //remove currentUser from userFollowing for iterating retweets
            //right now we don't want to display a currentUsers's *own retweets* in the timeline.
            currentUserFollowing.userFollowing.pop();

            //for each tweet, check if any of the retweet usernames equal a username in the current user's following array.
            //if a match is found, push the username to a new array. Then we display a list of retweets by users that I follow only. eg: 'retweeted by X Y and Z'
            angular.forEach(tweets, function (tweet) {
              if(tweet.retweets) {
                tweet.followingAndRetweeted = [];

                angular.forEach(tweet.retweets, function (retweet) {
                  if(currentUserFollowing.userFollowing.indexOf(retweet.username) > -1) {
                    tweet.followingRetweeted = true;
                    tweet.followingAndRetweeted.push({username:retweet.username});
                    tweet.retweetedUsernames = tweet.followingAndRetweeted;
                  }
                  if(retweet.username === $scope.loggedInUser) {
                    tweet.loggedinUserRetweeted = true;
                    tweet.usersRetweetId = retweet._id;
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
  */

  $scope.$on('refreshTweets', function () {
    console.info('refreshTweets called - getting new tweets');
    $scope.getTweets();
  });

});
