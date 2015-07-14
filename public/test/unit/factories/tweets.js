describe('tweetsFactory', function(){

  beforeEach(module('meanTweetsApp'));

  describe('tweets endpoint', function(){

    it('should be defined', inject(function (tweetsFactory) {
      expect(tweetsFactory.tweets).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (tweetsFactory) {
      expect(tweetsFactory.tweets.route).toEqual('api/tweets');
    }));

  });

  describe('timeline endpoint', function(){

    it('should be defined', inject(function (tweetsFactory) {
      expect(tweetsFactory.timeline).toBeDefined();
    }));

    //how to test customGET route? 

  });

  describe('search endpoint', function(){

    it('should be defined', inject(function (tweetsFactory) {
      expect(tweetsFactory.search).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (tweetsFactory) {
      var searchQuery = 'starWarsFilm';
      expect(tweetsFactory.search(searchQuery).route).toEqual('api/search/' + searchQuery);
    }));

  });

  describe('user specific tweets endpoint', function(){

    it('should be defined', inject(function (tweetsFactory) {
      expect(tweetsFactory.userSpecificTweets).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (tweetsFactory) {
      var username = 'humphrey'
      expect(tweetsFactory.userSpecificTweets(username).route).toEqual('api/profiles/' + username + '/tweets');
    }));

  });

  describe('single tweet endpoint', function(){

    it('should be defined', inject(function (tweetsFactory) {
      expect(tweetsFactory.singleTweet).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (tweetsFactory) {
      var tweetId = '55890abc18923oix5579'
      expect(tweetsFactory.singleTweet(tweetId).route).toEqual('api/tweets/' + tweetId);
    }));

  });

});
