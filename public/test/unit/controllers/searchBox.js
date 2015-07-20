describe('SearchBoxCtrl', function() {

  beforeEach(function() {

    module('meanTweetsApp');

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      ctrl = $controller('SearchBoxCtrl', {
        $scope: scope
      });

    });

  });

  describe('initialization', function(){

    it('should have a doQuery function', function(){
      expect(scope.doQuery).toBeDefined();
    });

    it('should not call doQuery function', function(){
      spyOn(scope, 'doQuery');
      expect(scope.doQuery).not.toHaveBeenCalled();
    });

  });

  describe('do query', function(){
    beforeEach(function(){
      mockQuery = 'taken3';

      spyOn(scope, 'doQuery').and.callThrough();

      spyOn(state, 'go');

      scope.doQuery(mockQuery);

      spyOn(scope, '$broadcast').and.callThrough();

    });

    it('should call doQuery function', function(){
      expect(scope.doQuery).toHaveBeenCalled();
    });

    it('should instigate a $state.go to search', function(){
      expect(state.go).toHaveBeenCalled();
    });

    it('should instigate a $state.go to search with correct parama/query', function(){
      expect(state.go).toHaveBeenCalledWith('search', {searchParam: mockQuery});
    });

    describe('when searchBoxOkToClear is broadcast', function(){

      describe('if a query exists', function(){

        beforeEach(function(){
          scope.search = {
            query : mockQuery
          }
          scope.$broadcast('searchBoxOkToClear');
        });

        it('should clear the query', function(){
          expect(scope.search.query).toEqual('');
        });

      });

      describe('if a query does not exist', function(){

        beforeEach(function(){
          scope.$broadcast('searchBoxOkToClear');
        });

        it('should have undefined search', function(){
          expect(scope.search).toBeUndefined();
        });

      });

    });

  });

});