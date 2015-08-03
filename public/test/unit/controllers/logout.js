'use strict';

describe('LogoutCtrl', function() {

  var $q,
      scope,
      ctrl;

  beforeEach(function() {
    module('meanTweetsApp');

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      ctrl = $controller('LogoutCtrl', { $scope: scope });
    });

  });

  it('should instantiate the controller', function(){
    expect(ctrl).not.toBeUndefined();
  });

  it('should have auth defined', inject(function (auth){
    expect(auth).toBeDefined();
  }));

  it('should have sign out function', inject(function (auth){
    expect(auth.signout).toBeDefined();
  }));

  it('should have empty parent message', function(){
    expect(scope.$parent.message).toEqual('');
    expect(scope.$parent.message).not.toEqual(' ');
  });

  it('should have correct location path', function (){
    expect(ctrl.locationPath).toEqual('/see-you-soon');

  });

});