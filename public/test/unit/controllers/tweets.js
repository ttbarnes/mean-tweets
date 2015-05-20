describe('TweetsCtrl', function() {

  var $q;
  var scope;
  var target;

  beforeEach(function() {
    module('meanExampleApp');

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      target = $controller('TweetsCtrl', { $scope: scope });
    });

  });

  it('should have max char length variable of 140', function(){
    expect(scope.maxCharLength).toBeDefined();
    expect(scope.maxCharLength).toEqual(140);
  });

});