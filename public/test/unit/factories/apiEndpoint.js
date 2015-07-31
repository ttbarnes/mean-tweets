'use strict';

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
      expect(apiEndpointFactory.favourites).toBeDefined();
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

  describe('user endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.user).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (apiEndpointFactory) {
      var username = 'ben';
      expect(apiEndpointFactory.user(username).route).toEqual('api/profiles/' + username);
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

  describe('user details endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.userDetails).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (apiEndpointFactory) {
      var username = 'humphrey';
      expect(apiEndpointFactory.userDetails(username).route).toEqual('api/profiles/' + username + '/details');
    }));

  });

  describe('user favourites endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.userFavourites).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (apiEndpointFactory) {
      var tweetId = '55890abc18923oix5579';
      var username = 'bill';
      expect(apiEndpointFactory.userFavourites(username, tweetId).route).toEqual('api/profiles/' + username + '/tweets/favourites/' + tweetId);
    }));

  });

  describe('user following endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.userFollowing).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (apiEndpointFactory) {
      var username = 'dillon';
      expect(apiEndpointFactory.userFollowing(username).route).toEqual('api/profiles/' + username + '/following');
    }));

  });

  describe('user followers endpoint', function(){

    it('should be defined', inject(function (apiEndpointFactory) {
      expect(apiEndpointFactory.userFollowers).toBeDefined();
    }));

    it('should generate correct endpoint', inject(function (apiEndpointFactory) {
      var username = 'dillon';
      expect(apiEndpointFactory.userFollowers(username).route).toEqual('api/profiles/' + username + '/followers');
    }));

  });



});
