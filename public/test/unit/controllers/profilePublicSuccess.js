describe('ProfilePublicCtrl - success: user found', function() {

  var state = {
    params: [{
      username: 'steven'
    }]
  };

  var stateParamsUsername = state.params[0].username;

  var currentUserUsername = 'phillip';
  
  var profileUsernameDataMockSuccess = {
    profile: [{
      details: [{
        _id: '1234',
        about: 'I love tweeting about things',
        location: 'Newcastle',
        websiteUrl: 'http://steven.newcastle.com'
      }],
      favourites: [],
      followers: [],
      following: []
    }],
    username: currentUserUsername,
    success: true
  };

  var currentUserFactoryMockSuccess = {
    isAuth : true,
    username : currentUserUsername
  };

  var tweetIdMock = 'b456789akIJmnHJNkmQIk24449';

  beforeEach(function() {

    module('meanTweetsApp', function ($provide) {
      $provide.value('profileUsernameData', profileUsernameDataMockSuccess = profileUsernameDataMockSuccess);
      $provide.value('currentUserFactory', currentUserFactoryMockSuccess);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      httpBackend = $injector.get('$httpBackend');
      state = $injector.get('$state');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      apiEndpointFactory = $injector.get('apiEndpointFactory');

      ctrl = $controller('ProfilePublicCtrl', { 
        $scope: scope,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory
      });

      scope.loggedInUser = currentUserFactory.username;

      scope.profileUsername = stateParamsUsername; //profileUsername is the public profile.

      httpBackend.whenGET(/views.*/).respond(200, '');

    });

  });


  it('should apply currentUserFactory.username to scope', function(){
    expect(scope.loggedInUser).toEqual(currentUserFactory.username);
  });

  describe('if profileUsername is the same as loggedInUser', function(){

    beforeEach(function(){
      scope.profileUsername = currentUserUsername;
      httpBackend.flush();
      scope.$digest();
    });

    //why doesn't this work?
    /*
    it('should declare usersOwnProfile = true', function(){
      expect(scope.usersOwnProfile).toBeTruthy();
    });
    */

  });

  describe('delete tweet', function(){

    beforeEach(function(){
      spyOn(scope, 'deleteTweetDialog').and.callThrough();
    });

    it('should have a deleteTweetDialog function defined', function(){
      expect(scope.deleteTweetDialog).toBeDefined();
    });
    
    it('should call deleteTweetDialog function when called', function(){
      scope.deleteTweetDialog(tweetIdMock);
      expect(scope.deleteTweetDialog).toHaveBeenCalledWith(tweetIdMock);
    });

  });

  /*
  describe('initilisation', function() {

    it('should have the same username in scope and state params', function() {
      expect(scope.profileUsername).toEqual(stateParamsUsername);
    });

    it('should have profileUsernameData username in scope', function() {
      expect(scope.profileUsernameData.username).toBeDefined();
    });

    it('should have undefined userNotFound', function() {
      expect(scope.userNotFound).toBeFalsy();
    });

  });

  //todo: test fof no user found.
  //how to $provide ui-route resolve in jasmine describe blocks?
  //describe('when/if user has not been found', function() {   });

  describe('when/if user has been found', function() {

    it('should render profileUsernameData in scope', function() {
      expect(scope.profileUsernameData).toBeDefined();
      expect(scope.profileUsernameData).toEqual(profileUsernameDataMockSuccess);
      expect(scope.profileUsernameData.profile[0].details).toBeDefined();
      expect(scope.profileUsernameData.profile[0].favourites).toBeDefined();
      expect(scope.profileUsernameData.profile[0].followers).toBeDefined();
      expect(scope.profileUsernameData.profile[0].following).toBeDefined();
      expect(scope.profileUsernameData.success).toBeDefined();
    });

    it('should render profileUsernameData.profile in scope', function() {
      expect(scope.profileUser).toEqual(profileUsernameDataMockSuccess.profile);
      expect(scope.profileUser[0].details).toBeDefined();
      expect(scope.profileUser[0].favourites).toBeDefined();
      expect(scope.profileUser[0].followers).toBeDefined();
      expect(scope.profileUser[0].following).toBeDefined();
    });

    describe('if current user is logged in', function() {

      it('should have true isAuth', function() {
        expect(currentUserFactory.isAuth).toBeTruthy();
      });

      it('should render the user\'s username in scope', function() {
        expect(scope.loggedInUser).toEqual(currentUserFactory.username);
      });

      describe('if current logged in user is the same as public profile username ', function() {

        //expect(scope.usersOwnProfile).toBeTruthy();

      });

    });
a

  });
  */

});