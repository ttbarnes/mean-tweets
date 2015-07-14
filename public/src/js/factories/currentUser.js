//usage eg:
//
//currentUserFactory.username
//

angular.module('meanTweetsApp').factory('currentUserFactory', function (auth){

    var isAuth = false;
    var user = false;

    if(auth.isAuthenticated === true) {

      authUsername = auth.profile.nickname;

      console.info('currentUser: ' + authUsername)

      user = {
        isAuth : true,
        username : authUsername
      }

    }

    return user;

  });