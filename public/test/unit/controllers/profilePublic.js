describe('ProfilePublicCtrl', function() {

  var state = {
    params: [{
      username: 'steven'
    }]
  };

  var stateParamsUsername = state.params[0].username;

  var currentUserUsername = 'phillip';

  //ui-router resolve data mocks: http://stackoverflow.com/a/21078955/1257504
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
    username : stateParamsUsername
  };

  beforeEach(function() {

    module('meanTweetsApp', function ($provide) {
      $provide.value('profileUsernameData', profileUsernameDataMockSuccess = profileUsernameDataMockSuccess);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      apiEndpointFactory = $injector.get('apiEndpointFactory');

      ctrl = $controller('ProfilePublicCtrl', { 
        $scope: scope,
        currentUserFactory: currentUserFactory
      });

      currentUserFactory = currentUserFactoryMockSuccess;

      scope.profileUsername = stateParamsUsername;

      scope.loggedInUser = currentUserFactory.username;

    });

  });

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

        /*
        it('should have the same username in state params and profileUsernameData', function() {
          expect(scope.profileUsernameData.username).toEqual(stateParamsUsername);
        });
        */

      });

    });


  });


});