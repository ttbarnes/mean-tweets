describe('apiEndpointFactory', function(){

  beforeEach(module('meanTweetsApp'));

  describe('tweets endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.tweets).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.tweets.route).toEqual('api/tweets');
    }));

  });

  describe('timeline endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.timeline).toBeDefined();
    }));

    //todo: test customGET route (how?)

  });

  describe('search endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.search).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (apiEndpointFactory) {
      var searchQuery = 'starWarsFilm';
      expect(apiEndpointFactory.search(searchQuery).route).toEqual('api/search/' + searchQuery);
    }));

  });

  describe('user tweets endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.userTweets).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (apiEndpointFactory) {
      var username = 'humphrey';
      expect(apiEndpointFactory.userTweets(username).route).toEqual('api/profiles/' + username + '/tweets');
    }));

  });

  describe('singleTweet endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.singleTweet).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (apiEndpointFactory) {
      var tweetId = '55890abc18923oix5579';
      expect(apiEndpointFactory.singleTweet(tweetId).route).toEqual('api/tweets/' + tweetId);
    }));

  });

  describe('favourites endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.userFavourites).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (apiEndpointFactory) {
      var tweetId = '55890abc18923oix5579';
      expect(apiEndpointFactory.favourites(tweetId).route).toEqual('api/tweets/' + tweetId + '/favourites');
    }));

  });

  describe('singleFavourite endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.singleFavourite).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (apiEndpointFactory) {
      var tweetId = '55890abc18923oix5579';
      var favouriteId = 'an12lj3l1md0890fdm';
      expect(apiEndpointFactory.singleFavourite(tweetId, favouriteId).route).toEqual('api/tweets/' + tweetId + '/favourites/' + favouriteId);
    }));

  });

  describe('retweets endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.favourites).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (apiEndpointFactory) {
      var tweetId = '55890abc18923oix5579';
      expect(apiEndpointFactory.retweets(tweetId).route).toEqual('api/tweets/' + tweetId + '/retweets');
    }));

  });

  describe('singleRetweet endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.singleRetweet).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (apiEndpointFactory) {
      var tweetId = '55890abc18923oix5579';
      var retweetId = 'an12lj3l1md0890fdm';
      expect(apiEndpointFactory.singleRetweet(tweetId, retweetId).route).toEqual('api/tweets/' + tweetId + '/retweets/' + retweetId);
    }));

  });


});
