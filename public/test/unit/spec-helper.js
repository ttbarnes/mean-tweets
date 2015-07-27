var currentUserFactoryMockSuccess = {
  isAuth : true,
  username : 'wally'
};

function specHelperHttpBackend(){
  httpBackend.whenGET(/views.*/).respond(200, '');
}

function specHelper(){

    module('meanTweetsApp', function ($provide) {
      $provide.value('currentUserFactory', currentUserFactoryMockSuccess);
    });

}