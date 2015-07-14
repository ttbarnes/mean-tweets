describe('copyGlobalFactory', function(){

  beforeEach(module('meanTweetsApp'));

  it('should have the correct app name', inject(function (copyGlobalFactory){
    expect(copyGlobalFactory.appName).toEqual('Mean tweets');
  }));

});
