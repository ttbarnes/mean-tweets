describe('RetweetTweetCtrl', function() {

  beforeEach(function() {

    specHelper(); //jshint ignore:line

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      apiEndpointFactory = $injector.get('apiEndpointFactory');
      ctrl = $controller('RetweetTweetCtrl', { 
        $scope: scope,
        $httpBackend: httpBackend,
        apiEndpointFactory: apiEndpointFactory,
        currentUserFactory: currentUserFactory,
      });

    });

    tweetId   = '1k2n4jn4mn5l1mn3k4';
    retweetId = '9b7nh7e2j4w9x1m2w3';

    httpBackend.whenGET(/views.*/).respond(200, '');

    httpBackend.whenGET('/api/tweets/' + tweetId + '/retweets').respond(200, '');

  });

  describe('initialization', function(){

    it('should have a retweetTweet function', function(){
      expect(scope.retweetTweet).toBeDefined();
    });

    it('should run retweetTweet when called', function(){
      spyOn(scope, 'retweetTweet');
      scope.retweetTweet(tweetId);
      expect(scope.retweetTweet).toHaveBeenCalled();
    });

    it('should have a removeRetweet function', function(){
      expect(scope.removeRetweet).toBeDefined();
    });

    it('should run removeRetweet when called', function(){
      spyOn(scope, 'removeRetweet');
      scope.removeRetweet(tweetId, retweetId);
      expect(scope.removeRetweet).toHaveBeenCalled();
    });

  });

  describe('retweet tweet', function(){

    beforeEach(function(){

      ctrl.mockNewRetweet = {
        username : currentUserFactory.username
      }

      ctrl.newRetweet = {
        username : ctrl.mockNewRetweet.username
      }

      spyOn(scope, 'retweetTweet');

    });

    describe('new retweet object', function(){

      it('should generate newRetweet object', function(){
        expect(ctrl.newRetweet).toBeDefined();
      });

      describe('username property', function(){

        it('should be generated', function(){
          expect(ctrl.newRetweet.username).toBeDefined();
        });

        it('should equal current username', function(){
          expect(ctrl.newRetweet.username).toEqual(currentUserFactory.username);
        });

      });

    });

    describe('new retweet PUT success', function(){

      beforeEach(function(){
        spyOn(Restangular, 'one').and.callThrough();
        httpBackend.flush();
        scope.$digest();
      });

      it('should generate the correct endpoint', function(){
        expect(apiEndpointFactory.retweets(tweetId).route).toEqual('api/tweets/' + tweetId + '/retweets');
      });

      it('should have loading=false', function(){
        expect(scope.loading).toBeFalsy();
      });

    });

  });


  describe('remove retweet', function(){

    beforeEach(function(){
      spyOn(scope, 'removeRetweet');
      scope.removeRetweet(tweetId, retweetId);
      scope.$digest();
    });

    describe('remove retweet REMOVE success', function(){

      beforeEach(function(){
        spyOn(Restangular, 'one').and.callThrough();
        httpBackend.flush();
        scope.$digest();
      });

      it('should generate the correct endpoint', function(){
        expect(apiEndpointFactory.singleRetweet(tweetId, retweetId).route).toEqual('api/tweets/' + tweetId + '/retweets/' + retweetId);
      });

      it('should have loading=false', function(){
        expect(scope.loading).toBeFalsy();
      });

    });

  });

});