'use strict';

describe('FollowUserCtrl', function() {

  var $q,
      scope,
      httpBackend,
      Restangular,
      currentUserFactory,
      apiEndpointFactory,
      ctrl,
      userFollowerMock,
      userFollowingMock;

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

      ctrl = $controller('FollowUserCtrl', { 
        $scope: scope,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory,
        apiEndpointFactory: apiEndpointFactory
      });

    });

    httpBackend.whenGET(/views.*/).respond(200, '');

    userFollowerMock = currentUserFactory.username;

    userFollowingMock = 'hans';

    var endpointPUTFollowing = '/api/profiles/' + userFollowerMock + '/following';
    var endpointPUTFollowers = '/api/profiles/' + userFollowingMock + '/followers';

    httpBackend.when('PUT', endpointPUTFollowing).respond(200, '');
    httpBackend.when('PUT', endpointPUTFollowers).respond(200, '');

  });

  it('should instantiate the controller', function(){
    expect(ctrl).not.toBeUndefined();
  });

  it('should have a followUser function', function(){
    expect(scope.followUser).toBeDefined();
  });

  it('should execute followUser when called', function(){
    spyOn(scope, 'followUser');
    scope.followUser();
    expect(scope.followUser).toHaveBeenCalled();
  });

  describe('followUser', function(){

    beforeEach(function(){
      spyOn(scope, 'followUser').and.callThrough();
      spyOn(Restangular, 'all').and.callThrough();
      scope.followUser(userFollowerMock, userFollowingMock);

      ctrl.newFollowings = {
        userFollower: userFollowerMock,
        userFollowing: userFollowingMock
      };

      httpBackend.flush();
      scope.$digest();
    });

    it('should generate the correct following endpoint', function(){
      expect(apiEndpointFactory.userFollowing(ctrl.newFollowings.userFollower).route).toEqual('api/profiles/' + ctrl.newFollowings.userFollower + '/following');
    });

    it('should generate the correct followers endpoint', function(){
      expect(apiEndpointFactory.userFollowers(ctrl.newFollowings.userFollowing).route).toEqual('api/profiles/' + ctrl.newFollowings.userFollowing + '/followers');
    });

    describe('newFollowings object', function(){

      it('should be created', function(){
        expect(ctrl.newFollowings).toBeDefined();
      });

      it('should create userFollower property', function(){
        expect(ctrl.newFollowings.userFollower).toBeDefined();
        expect(ctrl.newFollowings.userFollower).toEqual(userFollowerMock);
      });

      it('should create userFollowing property', function(){
        expect(ctrl.newFollowings.userFollowing).toBeDefined();
        expect(ctrl.newFollowings.userFollowing).toEqual(userFollowingMock);
      });

    });

  });

});