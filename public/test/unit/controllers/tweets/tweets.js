describe('TweetsCtrl - public profile and timeline context', function() {

  var publicProfileCtrlName = 'ProfilePublicCtrl';
  var publicProfileUsername = 'steven';

  var stateParamsMock = {
    username: publicProfileUsername
  };

  var currentUserFactoryMockSuccess = {
    isAuth : true,
    username : 'wally'
  };

  var stateMock = {
    current: {
      controller: publicProfileCtrlName
    }
  };

  beforeEach(function() {

    module('meanTweetsApp', function ($provide){
      $provide.value('currentUserFactory', currentUserFactoryMockSuccess);
      $provide.value('$state', state = stateMock);
      $provide.value('$stateParams', stateParams = stateParamsMock);
    }); 

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      stateParams = $injector.get('$stateParams');
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      ctrl = $controller('TweetsCtrl', { 
        $scope: scope, 
        $stateParams: stateParams,
        $state: state,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory
      });

    });

    var mockTweets = readJSON('test/unit/mock-data/tweets.json');

    var apiRoutes = {
      userTweets: 'api/profiles/' + stateParams.username + '/tweets'
    }

    httpBackend.whenGET(/views.*/).respond(200, '');
    httpBackend.whenGET('/' + apiRoutes.userTweets).respond(mockTweets);

    ctrl.endPoint = apiRoutes.userTweets;
    spyOn(scope, 'currentUserTweetsCheck');
    spyOn(scope, 'getTweets');
    spyOn(Restangular, 'all').and.callThrough();
    httpBackend.flush();
    scope.$digest();

  });

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


  describe('getTweets function', function(){

    it('should be defined', function(){
      expect(scope.getTweets).toBeDefined();
    });

    it('should execute when called', function(){
      scope.getTweets();
      expect(scope.getTweets).toHaveBeenCalled();
    });

    describe('after timeline tweets are returned', function(){

      it('should call currentUserTweetsCheck', function(){
        expect(scope.currentUserTweetsCheck).toHaveBeenCalled();
      });

    });

  });

  //todo: test currentUserTweetsCheck specifics


});