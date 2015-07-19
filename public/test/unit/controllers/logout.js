describe('LogoutCtrl', function() {

  var $q;
  var scope;
  var auth;
  var ctrl;

  beforeEach(function() {
    module('meanTweetsApp');

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      ctrl = $controller('LogoutCtrl', { $scope: scope });
    });

  });

  it('should have auth defined', inject(function (auth){
    expect(auth).toBeDefined();
  }));

  it('should have sign out function', inject(function (auth){
    expect(auth.signout).toBeDefined();
  }));

  it('should have empty parent message', inject(function (auth){
    expect(scope.$parent.message).toEqual('');
    expect(scope.$parent.message).not.toEqual(' ');
  }));

  it('should have correct location path', function (){
    expect(ctrl.locationPath).toEqual('/see-you-soon');

  });


});