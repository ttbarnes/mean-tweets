var currentUserFactoryMockSuccess = {
  isAuth : true,
  username : 'wally'
};


var mockTweets         = readJSON('test/unit/mock-data/tweets.json');
var mockSearchTweets   = readJSON('test/unit/mock-data/tweets-search.json');
var mockSingleTweet    = readJSON('test/unit/mock-data/single-tweet.json');
var mockProfile        = readJSON('test/unit/mock-data/user.json');
var mockUser           = readJSON('test/unit/mock-data/user.json');
var mockTimelineTweets = readJSON('test/unit/mock-data/tweets.json');


function specHelper(){

    module('meanTweetsApp', function ($provide) {
      $provide.value('currentUserFactory', currentUserFactoryMockSuccess);
    });

}
