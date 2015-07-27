describe('TweetsCtrl - timeline context', function() {

  var publicProfileUsername = 'steven';

  var currentUserFactoryMockSuccess = {
    isAuth : true,
    username : 'wally'
  };

  //home route/view is timeline context, there is no controller for this
  var stateMock = {
    params: {
      username: publicProfileUsername
    },
    current: {
      controller: ''
    }
  };

  //this is generated inside the controller without scope 
  var currentUserFollowingMock = 'userFollowing=ben&userFollowing=hellotest333&userFollowing=hellotest4444&userFollowing=wally'

  beforeEach(function() {

    module('meanTweetsApp', function ($provide){
      $provide.value('currentUserFactory', currentUserFactoryMockSuccess);
      $provide.value('$state', state = stateMock);
    }); 

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state')
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      ctrl = $controller('TweetsCtrl', { 
        $scope: scope, 
        $state: state,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory
      });

    });

    var mockUser = readJSON('test/unit/mock-data/user.json');
    var mockTimelineTweets = readJSON('test/unit/mock-data/tweets.json');

    var apiRoutesInit = {
      profiles: '/api/profiles/',
      timeline: '/api/tweetsTimeline?' + currentUserFollowingMock
    }

    httpBackend.whenGET(/views.*/).respond(200, '');

    httpBackend.whenGET(apiRoutesInit.profiles + currentUserFactory.username).respond(mockUser);

    httpBackend.whenGET(apiRoutesInit.timeline).respond(mockTimelineTweets);

    ctrl.initialEndPoint = {
      route : 'api/profiles/' + currentUserFactory.username
    };

    spyOn(scope, 'currentUserTweetsCheck');
    spyOn(scope, 'getTweets');
    spyOn(Restangular, 'all').and.callThrough();
    httpBackend.flush();
    scope.$digest();

  });

  describe('initialization', function(){

    describe('current user (if exists)', function(){
      
      it('should be assigned to scope', function(){
        expect(scope.loggedInUser).toBeDefined();
      });

      it('should equal currentUserFactory username', function(){
        expect(scope.loggedInUser).toEqual(currentUserFactory.username);
      });

      it('should have a currentUserTweetsCheck function', function(){
        expect(scope.currentUserTweetsCheck).toBeDefined();
      });

    });


    describe('after state check', function(){

      it('should have false statePublicProfile', function (){
        expect(scope.statePublicProfile).toBeFalsy();
      });

      it('should generate the correct endpoint', function(){
        expect(ctrl.initialEndPoint.route).toEqual('api/profiles/' + currentUserFactory.username);
      });

    });

    describe('getTweets function', function(){

      it('should be defined', function(){
        expect(scope.getTweets).toBeDefined();
      });

      it('should execute when called', function(){
        scope.getTweets();
        expect(scope.getTweets).toHaveBeenCalled();
      });

      describe('after initial api call', function(){

        it('should apply user data to scope', function(){
          expect(scope.currentUser).toBeDefined();
        });

        it('should have some user objects/fields', function(){
          expect(scope.currentUser.username).toBeDefined();
          expect(scope.currentUser.favourites).toBeDefined();
          expect(scope.currentUser.followers).toBeDefined();
          expect(scope.currentUser.following).toBeDefined();
        });

        it('should have false userNotTweeted', function(){
          expect(scope.userNotTweeted).toBeFalsy();
        });

        //todo: test customGET route (how?)

        //todo: test currentUserTweetsCheck specifics

        describe('after timeline tweets are returned', function(){

          it('should call currentUserTweetsCheck', function(){
            expect(scope.currentUserTweetsCheck).toHaveBeenCalled();
          });

          it('should have false userNoFollowings', function(){
            expect(scope.userNoFollowings).toBeFalsy();
          });

        });


      });




    });

  });

});
