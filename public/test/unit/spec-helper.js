var jsonMockPath = 'test/unit/mock-data/';

var currentUserFactoryMockSuccess = {
  isAuth : true,
  username : 'wally'
};

var mockTweets         = readJSON(jsonMockPath + 'tweets.json');
var mockSearchTweets   = readJSON(jsonMockPath + 'tweets-search.json');
var mockSingleTweet    = readJSON(jsonMockPath + 'single-tweet.json');
var mockUser           = readJSON(jsonMockPath + 'user.json');
var mockTimelineTweets = mockTweets;

function specHelper(){

    module('meanTweetsApp', function ($provide) {
      $provide.value('currentUserFactory', currentUserFactoryMockSuccess);
    });

}
