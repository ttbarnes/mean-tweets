describe('TweetFavouriteCtrl', function() {

  var currentUserFactoryMockSuccess = {
    isAuth : true,
    username : 'thor'
  };

  beforeEach(function() {

    module('meanTweetsApp', function ($provide) {
      $provide.value('currentUserFactory', currentUserFactoryMockSuccess);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      userProfileFactory = $injector.get('userProfileFactory');
      tweetsFactory = $injector.get('tweetsFactory');
      ctrl = $controller('TweetFavouriteCtrl', { 
        $scope: scope,
        $httpBackend: httpBackend,
        tweetsFactory: tweetsFactory,
        currentUserFactory: currentUserFactory,
        userProfileFactory: userProfileFactory
      });

      tweetId   = '1k2n4jn4mn5l1mn3k4';
      favouriteId = '9b7nh7e2j4w9x1m2w3';

      //prevents 'unexpected request: GET views/*/index.html' error
      httpBackend.whenGET(/views.*/).respond(200, '');

      httpBackend.whenGET('/api/tweets/' + tweetId + '/favourites').respond(200, '');

    });

  });

  describe('initialization', function(){

    it('should have a favouriteTweet function', function(){
      expect(scope.favouriteTweet).toBeDefined();
    });

    it('should have a unFavouriteTweet function', function(){
      expect(scope.unFavouriteTweet).toBeDefined();
    });

  });

  describe('favourite tweet', function(){

    beforeEach(function(){

      ctrl.mockNewFavourite = {
        username : currentUserFactory.username
      }

      ctrl.newFavourite = {
        username : ctrl.mockNewFavourite.username
      }

      spyOn(scope, 'favouriteTweet');
      scope.favouriteTweet(tweetId);

    });

    it('should have been called', function(){
      expect(scope.favouriteTweet).toHaveBeenCalledWith(tweetId);
    });

    describe('new favourite object', function(){

      it('should generate newFavourite object', function(){
        expect(ctrl.newFavourite).toBeDefined();
      });

      describe('username property', function(){

        it('should be generated', function(){
          expect(ctrl.newFavourite.username).toBeDefined();
        });

        it('should equal current username', function(){
          expect(ctrl.newFavourite.username).toEqual(currentUserFactory.username);
        });

      });

    });

    describe('new favourite PUT - tweetsFactory', function(){

      beforeEach(function(){
        spyOn(Restangular, 'one').and.callThrough();
        httpBackend.flush();
        scope.$digest();
      });

      it('should generate the correct endpoint', function(){
        expect(tweetsFactory.favourites(tweetId).route).toEqual('api/tweets/' + tweetId + '/favourites');
      });

      //todo: how to test restangular customPUT promise?

    });

    describe('new favourite PUT - userProfileFactory', function(){

      beforeEach(function(){
        spyOn(Restangular, 'all').and.callThrough();
        httpBackend.flush();
        scope.$digest();
      });

      it('should generate the correct endpoint', function(){
        expect(userProfileFactory.favourites(currentUserFactory.username, tweetId).route).toEqual('api/profiles/' + currentUserFactory.username + '/tweets/favourites/' + tweetId);
      });

      //todo: how to test restangular customPUT promise?

    });

  });


  describe('unFavourite tweet', function(){

    beforeEach(function(){

      spyOn(scope, 'unFavouriteTweet');
      scope.unFavouriteTweet(tweetId, favouriteId);

    });

    it('should have been called', function(){
      expect(scope.unFavouriteTweet).toHaveBeenCalledWith(tweetId, favouriteId);
    });


    describe('unfavourite REMOVE - tweetsFactory', function(){

      beforeEach(function(){
        spyOn(Restangular, 'one').and.callThrough();
        httpBackend.flush();
        scope.$digest();
      });

      it('should generate the correct endpoint', function(){
        expect(tweetsFactory.singleFavourite(tweetId, favouriteId).route).toEqual('api/tweets/' + tweetId + '/favourites/' + favouriteId);
      });

      //todo: how to test restangular remove promise?

    });

    describe('unfavourite REMOVE - userProfileFactory', function(){

      beforeEach(function(){
        spyOn(Restangular, 'all').and.callThrough();
        httpBackend.flush();
        scope.$digest();
      });

      it('should generate the correct endpoint', function(){
        expect(userProfileFactory.favourites(currentUserFactory.username, tweetId).route).toEqual('api/profiles/' + currentUserFactory.username + '/tweets/favourites/' + tweetId);
      });

      //todo: how to test restangular remove promise?

    });

  });




});