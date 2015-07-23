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

});