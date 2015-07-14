describe('ProfilePublicCtrl', function() {

  var state = {
    params: [{
      username: 'steven'
    }]
  };

  var stateParamsUsername = state.params[0].username;

  //ui-router resolve data mocks: http://stackoverflow.com/a/21078955/1257504
  var profileUsernameDataMock = {
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
    username: stateParamsUsername,
    success: true
  };

  beforeEach(function() {

    module('meanTweetsApp', function ($provide) {
      $provide.value('profileUsernameData', profileUsernameDataMock = profileUsernameDataMock);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      tweetsFactory = $injector.get('tweetsFactory');
      userProfileFactory = $injector.get('userProfileFactory');

      ctrl = $controller('ProfilePublicCtrl', { 
        $scope: scope
      });

      scope.profileUsername = stateParamsUsername;

    });

  });

  describe('initilisation', function() {

    it('should have the same username in scope and state params', function() {
      expect(scope.profileUsername).toEqual(stateParamsUsername);
    });

    it('should render profileUsernameData in scope', function() {
      expect(scope.profileUsernameData).toBeDefined();
      expect(scope.profileUsernameData).toEqual(profileUsernameDataMock);
      expect(scope.profileUsernameData.profile[0].details).toBeDefined();
      expect(scope.profileUsernameData.profile[0].favourites).toBeDefined();
      expect(scope.profileUsernameData.profile[0].followers).toBeDefined();
      expect(scope.profileUsernameData.profile[0].following).toBeDefined();
      expect(scope.profileUsernameData.success).toBeDefined();
    });

    it('should render profileUsernameData.profile in scope', function() {
      expect(scope.profileUser).toEqual(profileUsernameDataMock.profile);
      expect(scope.profileUser[0].details).toBeDefined();
      expect(scope.profileUser[0].favourites).toBeDefined();
      expect(scope.profileUser[0].followers).toBeDefined();
      expect(scope.profileUser[0].following).toBeDefined();
    });

    it('should have the same username in state params and profileUsernameData', function() {
      expect(scope.profileUsernameData.username).toBeDefined();
      expect(scope.profileUsernameData.username).toEqual(stateParamsUsername);
    });

    it('should have undefined userNotFound', function() {
      expect(scope.userNotFound).toBeFalsy();
    });

  });

  describe('when/if user has not been found', function() {


  });

  describe('when/if user has been found', function() {


  });


});