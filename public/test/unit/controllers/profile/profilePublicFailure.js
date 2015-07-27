describe('ProfilePublicCtrl - failure: user not found', function() {

  var state = {
    params: [{
      username: 'steven'
    }]
  };

  var stateParamsUsername = state.params[0].username;

  var currentUserUsername = 'phillip';

  var profileUsernameDataMockFailure = {
    username: stateParamsUsername,
    success: false
  };

  beforeEach(function() {

    module('meanTweetsApp', function ($provide) {
      $provide.value('profileUsernameData', profileUsernameDataMockFailure = profileUsernameDataMockFailure);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      Restangular = $injector.get('Restangular');
      apiEndpointFactory = $injector.get('apiEndpointFactory');

      ctrl = $controller('ProfilePublicCtrl', { 
        $scope: scope
      });

      scope.profileUsername = stateParamsUsername;

    });

  });

  it('should have profileUsernameData defined', function(){
    expect(scope.profileUsernameData).toBeDefined();
  });

  it('should have profileUsernameData username defined', function(){
    expect(scope.profileUsernameData.username).toBeDefined();
  });

  it('should have success failure in profileUsernameData', function(){
    expect(scope.profileUsernameData.success).toBeFalsy();
  });

  it('should have false profileUser', function(){
    expect(scope.profileUser).toBeFalsy();
  });

  it('should have false profileUserDetails', function(){
    expect(scope.profileUserDetails).toBeFalsy();
  });

  it('should have true user not found', function(){
    expect(scope.userNotFound).toBeTruthy();
  });

});