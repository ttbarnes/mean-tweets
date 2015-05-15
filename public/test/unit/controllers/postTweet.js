describe('PostTweetCtrl', function() {

  var scope;

  beforeEach(function() {
    module('meanExampleApp');

    inject(function($injector) {
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      target = $controller('PostTweetCtrl', { $scope: scope });
    });

  });

  it('should have a max char length', function(){
    expect(scope.maxCharLength).toBeDefined();
    expect(scope.maxCharLength).toEqual(140);
  });


});